<?php

namespace HR\Liveness\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LivenessToken implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value) || empty($value)) {
            $fail('Debes completar la verificación de identidad.');
            return;
        }

        $result = liveness_token_verify(
            $value,
            config('liveness.secret_key'),
            config('liveness.min_confidence', 60)
        );

        if (!$result['valid']) {
            $messages = [
                'expired'           => 'La verificación de identidad ha expirado. Por favor repítela.',
                'invalid_signature' => 'Token de verificación inválido.',
                'low_confidence'    => 'La verificación no alcanzó el nivel de confianza requerido.',
                'malformed'         => 'Token de verificación con formato incorrecto.',
                'decode_failed'     => 'No se pudo leer el token de verificación.',
            ];
            $fail($messages[$result['error']] ?? 'Verificación de identidad inválida.');
        }
    }
}
