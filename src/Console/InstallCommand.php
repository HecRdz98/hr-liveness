<?php

namespace HR\Liveness\Console;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    protected $signature   = 'liveness:install';
    protected $description = 'Instala y configura el paquete HR Liveness';

    public function handle(): int
    {
        $this->info('');
        $this->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->info('  HR Liveness — Instalación');
        $this->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // 1. Publicar config
        $this->call('vendor:publish', ['--tag' => 'liveness-config', '--force' => false]);
        $this->info('✓ Config publicado en config/liveness.php');

        // 2. Publicar assets
        $this->call('vendor:publish', ['--tag' => 'liveness-assets', '--force' => true]);
        $this->info('✓ Assets publicados en public/vendor/liveness/');

        // 3. Publicar Python
        $this->call('vendor:publish', ['--tag' => 'liveness-python', '--force' => false]);
        $this->info('✓ Script Python publicado en liveness/verify_liveness.py');

        // 4. Verificar Python
        $pythonBin = config('liveness.python_path');
        if (!$pythonBin) {
            exec('python3 --version 2>&1', $o, $rc);
            $pythonBin = $rc === 0 ? 'python3' : null;
            if (!$pythonBin) {
                exec('python --version 2>&1', $o, $rc);
                $pythonBin = $rc === 0 ? 'python' : null;
            }
        }

        if ($pythonBin) {
            exec($pythonBin . ' --version 2>&1', $ver);
            $this->info("✓ Python encontrado: {$pythonBin} — " . ($ver[0] ?? ''));
        } else {
            $this->error('✗ Python no encontrado en PATH. Instala Python 3.8+ y agrega LIVENESS_PYTHON al .env');
        }

        // 5. Verificar dependencias Python
        if ($pythonBin) {
            $deps = ['mediapipe', 'opencv-python', 'numpy'];
            foreach ($deps as $dep) {
                exec($pythonBin . ' -c "import ' . ($dep === 'opencv-python' ? 'cv2' : str_replace('-','_',$dep)) . '" 2>&1', $o, $rc);
                if ($rc === 0) {
                    $this->info("  ✓ {$dep}");
                } else {
                    $this->warn("  ✗ {$dep} no instalado. Ejecuta: pip install {$dep}");
                }
            }
        }

        // 6. Verificar script Python
        $scriptPath = config('liveness.script_path') ?? base_path('liveness/verify_liveness.py');
        if (file_exists($scriptPath)) {
            $this->info("✓ Script Python: {$scriptPath}");
        } else {
            $this->warn("✗ Script Python no encontrado en {$scriptPath}");
            $this->warn('  Ejecuta: php artisan vendor:publish --tag=liveness-python');
        }

        // 7. Recordatorio .env
        $this->newLine();
        $this->info('📋 Agrega al .env de ser necesario:');
        $this->line('   LIVENESS_SECRET=tu-clave-secreta-aqui');
        $this->line('   LIVENESS_PYTHON=python3');
        $this->line('   LIVENESS_SCRIPT=' . base_path('liveness/verify_liveness.py'));
        $this->newLine();
        $this->info('📦 Uso en Blade:');
        $this->line('   <x-liveness::field name="liveness_token" brand-name="MiApp"/>');
        $this->newLine();
        $this->info('✅ Instalación completada.');
        $this->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        return self::SUCCESS;
    }
}
