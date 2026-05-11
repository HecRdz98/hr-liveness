<?php
/**
 * Funciones HMAC para tokens de liveness.
 * Reutiliza la misma lógica del backend PHP standalone.
 */

if (!function_exists('liveness_token_sign')) {
    function liveness_token_sign(array $payload, string $secret): string
    {
        $b64 = liveness_b64url_encode(json_encode($payload));
        $sig = liveness_b64url_encode(hash_hmac('sha256', $b64, $secret, true));
        return $b64 . '.' . $sig;
    }
}

if (!function_exists('liveness_token_verify')) {
    function liveness_token_verify(string $token, string $secret, int $minConfidence = 60): array
    {
        $parts = explode('.', $token, 2);
        if (count($parts) !== 2) return ['valid' => false, 'error' => 'malformed'];

        [$b64, $givenSig] = $parts;
        $expectedSig = liveness_b64url_encode(hash_hmac('sha256', $b64, $secret, true));
        if (!hash_equals($expectedSig, $givenSig)) return ['valid' => false, 'error' => 'invalid_signature'];

        $payload = json_decode(liveness_b64url_decode($b64), true);
        if (!is_array($payload)) return ['valid' => false, 'error' => 'decode_failed'];
        if (time() > ($payload['exp'] ?? 0)) return ['valid' => false, 'error' => 'expired'];
        if (($payload['confidence'] ?? 0) < $minConfidence) return ['valid' => false, 'error' => 'low_confidence'];

        return ['valid' => true, 'payload' => $payload];
    }
}

if (!function_exists('liveness_b64url_encode')) {
    function liveness_b64url_encode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}

if (!function_exists('liveness_b64url_decode')) {
    function liveness_b64url_decode(string $data): string
    {
        $pad = (4 - strlen($data) % 4) % 4;
        return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', $pad));
    }
}
