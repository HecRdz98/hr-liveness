<?php
return [
    'python_path'    => env('LIVENESS_PYTHON', null),       // null = auto-detect
    'script_path'    => env('LIVENESS_SCRIPT', null),       // null = usa el del paquete
    'secret_key'     => env('LIVENESS_SECRET', env('APP_KEY', 'hr-liveness-secret')),
    'token_ttl'      => 1800,       // segundos de validez del token (30 min)
    'min_confidence' => 60,         // confianza mínima requerida (0-100)
    'timeout'        => 60,         // timeout del proceso Python en segundos
    'max_frames'     => 25,
    'max_snapshot_size' => 800000,
    'challenges'     => ['parpadea', 'derecha', 'izquierda', 'sonrie'],
    'photos_disk'    => 'local',
    'photos_path'    => 'liveness/photos',
    'log_channel'    => env('LIVENESS_LOG_CHANNEL', 'stack'),
    'brand_name'     => env('LIVENESS_BRAND', config('app.name', 'App')),
];
