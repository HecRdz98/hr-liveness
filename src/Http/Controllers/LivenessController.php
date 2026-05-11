<?php

namespace HR\Liveness\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class LivenessController extends Controller
{
    public function verify(Request $request): JsonResponse
    {
        $data = $request->validate([
            'frames'    => 'required|array|min:5',
            'challenge' => 'required|string',
            'snapshot'  => 'nullable|string',
        ]);

        $frames    = array_slice($data['frames'], 0, config('liveness.max_frames', 25));
        $challenge = $data['challenge'];
        $snapshot  = $data['snapshot'] ?? null;

        $resultado = $this->runPython($frames, $challenge);

        if (!$resultado) {
            return response()->json(['error' => 'Error durante el análisis de liveness.'], 500);
        }

        // Log estructurado
        Log::channel(config('liveness.log_channel', 'stack'))->info('liveness', [
            'challenge'       => $challenge,
            'frames_analyzed' => $resultado['frames_analyzed'] ?? 0,
            'passed'          => $resultado['passed'] ?? false,
            'confidence'      => $resultado['confidence'] ?? null,
            'ip'              => $request->ip(),
        ]);

        // Guardar foto si pasó
        if ($resultado['passed'] ?? false) {
            $resultado['photo_url'] = $this->saveSnapshot($snapshot, $challenge);

            // Firmar token
            $resultado['token'] = liveness_token_sign([
                'iat'        => time(),
                'exp'        => time() + config('liveness.token_ttl', 1800),
                'challenge'  => $challenge,
                'confidence' => $resultado['confidence'] ?? 0,
                'v'          => 1,
            ], config('liveness.secret_key'));
        }

        return response()->json($resultado);
    }

    public function photos(): JsonResponse
    {
        $disk = Storage::disk(config('liveness.photos_disk', 'local'));
        $path = config('liveness.photos_path', 'liveness/photos');

        $files = collect($disk->files($path))
            ->filter(fn($f) => str_ends_with($f, '.jpg'))
            ->sortByDesc(fn($f) => $disk->lastModified($f))
            ->take(12)
            ->map(function ($f) use ($disk) {
                $filename = basename($f);
                $parts    = explode('_', $filename);
                $slug     = count($parts) >= 4 ? rtrim($parts[3], '.jpg') : '?';
                return [
                    'url'       => $disk->url($f),
                    'filename'  => $filename,
                    'date'      => date('d/m/Y H:i', $disk->lastModified($f)),
                    'challenge' => $slug,
                ];
            })
            ->values();

        return response()->json(['photos' => $files]);
    }

    private function runPython(array $frames, string $challenge): ?array
    {
        $scriptPath = config('liveness.script_path') ?? base_path('liveness/verify_liveness.py');

        if (!file_exists($scriptPath)) {
            Log::error('liveness: script Python no encontrado', ['path' => $scriptPath]);
            return null;
        }

        $pythonBin = $this->detectPython();
        if (!$pythonBin) {
            Log::error('liveness: Python no encontrado en PATH');
            return null;
        }

        $payload     = json_encode(['frames' => $frames, 'challenge' => $challenge]);
        $descriptors = [0 => ['pipe','r'], 1 => ['pipe','w'], 2 => ['pipe','w']];
        $cmd         = $pythonBin . ' ' . escapeshellarg($scriptPath);
        $process     = proc_open($cmd, $descriptors, $pipes);

        if (!is_resource($process)) return null;

        fwrite($pipes[0], $payload);
        fclose($pipes[0]);

        stream_set_blocking($pipes[1], false);
        stream_set_blocking($pipes[2], false);

        $stdout    = '';
        $timeout   = config('liveness.timeout', 60);
        $startTime = time();
        $timedOut  = false;

        while (true) {
            $status = proc_get_status($process);
            $chunk  = fread($pipes[1], 8192);
            if ($chunk) $stdout .= $chunk;
            if (!$status['running']) break;
            if ((time() - $startTime) >= $timeout) { $timedOut = true; proc_terminate($process); break; }
            usleep(50000);
        }

        $chunk = fread($pipes[1], 65536);
        if ($chunk) $stdout .= $chunk;

        fclose($pipes[1]);
        fclose($pipes[2]);
        $exitCode = proc_close($process);

        if ($timedOut || $exitCode !== 0) return null;

        return json_decode($stdout, true);
    }

    private function detectPython(): ?string
    {
        $configured = config('liveness.python_path');
        if ($configured) return $configured;

        exec('python3 --version 2>&1', $o, $rc);
        if ($rc === 0) return 'python3';

        exec('python --version 2>&1', $o, $rc);
        if ($rc === 0) return 'python';

        return null;
    }

    private function saveSnapshot(?string $snapshot, string $challenge): ?string
    {
        if (!$snapshot || strlen($snapshot) > config('liveness.max_snapshot_size', 800000)) return null;

        if (!preg_match('/^data:image\/(jpeg|png|webp);base64,(.+)$/i', $snapshot, $m)) return null;

        $imgData = base64_decode($m[2], true);
        if ($imgData === false) return null;

        $slug     = preg_replace('/[^a-z]/', '', strtolower($challenge));
        $filename = date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '_' . $slug . '.jpg';
        $path     = config('liveness.photos_path', 'liveness/photos') . '/' . $filename;

        Storage::disk(config('liveness.photos_disk', 'local'))->put($path, $imgData);

        return $path;
    }
}
