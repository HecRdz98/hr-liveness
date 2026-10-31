# hr/liveness — Paquete Laravel

Paquete Composer para integrar **verificación facial Liveness** en proyectos Laravel como un campo de formulario reutilizable y white-label.

---

## Instalación

### 1. Agregar el repositorio en `composer.json`

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/HecRdz98/hr-liveness"
        }
    ],
    "require": {
        "hr/liveness": "dev-main"
    }
}
```

```bash
composer install
php artisan liveness:install
```

El comando `liveness:install`:
- Publica `config/liveness.php`
- Publica el widget JS en `public/vendor/liveness/`
- Publica el script Python en `liveness/verify_liveness.py`
- Verifica que Python y sus dependencias estén instalados

### 2. Variables de entorno (`.env`)

```env
LIVENESS_SECRET=genera-una-clave-larga-y-segura
LIVENESS_PYTHON=python3
LIVENESS_SCRIPT=/ruta/absoluta/a/liveness/verify_liveness.py
```

### 3. Dependencias Python en el servidor

```bash
pip install mediapipe opencv-python numpy
```

---

## Uso rápido

### Modo inline (pasos en tarjeta)

```blade
<form method="POST" action="{{ route('formulario.store') }}">
    @csrf

    <x-liveness::liveness-field
        name="liveness_token"
        brand-name="{{ config('app.name') }}"
        primary-color="#4f46e5"
        :show-snapshot="false"
        :show-gallery="false"
    />

    @error('liveness_token')
        <p class="error">{{ $message }}</p>
    @enderror

    <button type="submit">Enviar</button>
</form>
```

### Modo modal (botón → cámara pantalla completa)

```blade
<x-liveness::liveness-field
    name="liveness_token"
    render-mode="modal"
    trigger-label="📷 Verificar identidad"
    primary-color="#4f46e5"
/>
```

El componente renderiza automáticamente el botón trigger. Al hacer clic abre un backdrop oscuro con la cámara en proporción retrato (3:4). En móvil se presenta como bottom sheet.

### En el FormRequest

```php
use Illuminate\Support\Facades\Rule;

public function rules(): array
{
    return [
        'liveness_token' => ['required', Rule::liveness()],
        'liveness_photo' => ['nullable', 'string'],
    ];
}
```

### En el Controller

```php
public function store(MiFormRequest $request)
{
    MiModelo::create([
        'liveness_token' => $request->liveness_token,
        'liveness_photo' => $request->liveness_photo,
        'verified_at'    => now(),
    ]);
}

// Ver la foto de evidencia
$url = Storage::disk(config('liveness.photos_disk'))->url($modelo->liveness_photo);
```

---

## Props del componente `<x-liveness::liveness-field>`

### Identidad / marca

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `name` | `string` | `liveness_token` | Nombre base de los hidden inputs |
| `brand-name` | `string` | `config('app.name')` | Nombre de marca en el encabezado del widget |
| `brand-subtitle` | `string` | `null` | Subtítulo bajo la marca |

### Modo de presentación

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `render-mode` | `string` | `inline` | `inline` — tarjeta con pasos · `modal` — botón que abre un overlay |
| `trigger-label` | `string` | `Verificar identidad` | Texto del botón trigger (solo en modo `modal`) |
| `show-snapshot` | `bool` | `true` | Muestra la foto circular en el resultado exitoso |
| `show-gallery` | `bool` | `true` | Muestra la sección "Capturas anteriores" en el resultado |

### Colores (atajos)

| Prop | Tipo | Default | CSS variable |
|---|---|---|---|
| `primary-color` | `string` | `#0d6efd` | `--lv-primary` |
| `accent-color` | `string` | `#0d6efd` | `--lv-accent` |
| `bg-color` | `string` | `#ffffff` | `--lv-bg` |
| `surface-color` | `string` | `#ffffff` | `--lv-surface` |
| `text-color` | `string` | `#212529` | `--lv-text` |
| `success-color` | `string` | `#198754` | `--lv-success` |
| `danger-color` | `string` | `#dc3545` | `--lv-danger` |

Para control total de tema usa el prop `theme` (array) que acepta cualquiera de las variables CSS del widget:

```blade
<x-liveness::liveness-field
    name="liveness_token"
    :theme="[
        'colorPrimary'    => '#6d28d9',
        'colorAccent'     => '#8b5cf6',
        'colorBg'         => '#0f172a',
        'colorSurface'    => '#1e293b',
        'colorText'       => '#f1f5f9',
        'colorSuccess'    => '#34d399',
        'colorDanger'     => '#f87171',
        'radiusCard'      => '12px',
        'fontBody'        => '\'Inter\', sans-serif',
    ]"
/>
```

### Verificación y captura

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `challenges` | `array` | config | Desafíos activos: `['parpadea','sonrie','derecha','izquierda']` |
| `photo-max-width` | `int` | `640` | Ancho máximo del snapshot (px) |
| `photo-max-height` | `int` | `480` | Alto máximo del snapshot (px) |
| `photo-quality` | `float` | `0.82` | Calidad JPEG del snapshot (0.0–1.0) |
| `record-video` | `bool` | config | Graba video durante el reto. Solo puede **apagarlo** para un campo; si `record_video` está apagado en config, no graba |
| `texts` | `array` | `[]` | Override de textos / i18n |

El componente genera automáticamente:
- `<input type="hidden" name="{name}">` — token de verificación
- `<input type="hidden" name="{name}_photo">` — URL de la foto evidencia
- `<input type="hidden" name="{name}_video">` — ruta del video evidencia (solo con `record_video` activo)

---

## Ejemplos de temas

El tema por defecto es **claro y neutral** (Bootstrap-compatible). La zona de cámara siempre se mantiene oscura para visibilidad del video (`colorVideoBg`, default `#111827`).

```blade
{{-- Default: claro, Bootstrap blue — sin props --}}
<x-liveness::liveness-field name="liveness_token" />

{{-- Marca personalizada, azul corporativo --}}
<x-liveness::liveness-field
    name="liveness_token"
    brand-name="Mi Empresa"
    primary-color="#2563eb"
/>

{{-- Violeta / indigo --}}
<x-liveness::liveness-field
    name="liveness_token"
    primary-color="#7c3aed"
    success-color="#16a34a"
/>

{{-- Modal minimalista --}}
<x-liveness::liveness-field
    name="liveness_token"
    render-mode="modal"
    trigger-label="Verificar identidad"
    primary-color="#0d6efd"
/>

{{-- Tema oscuro (estilo original del widget) --}}
<x-liveness::liveness-field
    name="liveness_token"
    primary-color="#0066ff"
    accent-color="#00d4ff"
    bg-color="#080c18"
    surface-color="#0d1226"
    text-color="#e8eaf6"
    success-color="#00e5a0"
    danger-color="#ff4566"
    :theme="[
        'colorBorder'      => 'rgba(0,212,255,0.15)',
        'colorBorderSubtle'=> 'rgba(255,255,255,0.05)',
        'colorTextMuted'   => '#8892b0',
        'colorVideoBg'     => '#050810',
        'radiusCard'       => '20px',
        'radiusInner'      => '12px',
    ]"
/>
```

---

## Foto como evidencia

Cuando la verificación es exitosa el backend guarda automáticamente una foto y devuelve la ruta. El widget la escribe en el hidden input `{name}_photo` para que llegue con el submit del formulario.

Por defecto (`photo_source => 'frame'`) la foto **la elige el servidor** entre los frames que se analizaron: la de pose más frontal, ojos abiertos, boca cerrada, cara completa dentro del cuadro y mayor nitidez (varianza del Laplaciano), con preferencia leve por los primeros frames, antes de ejecutar el reto. Así la foto sirve para compararla contra un documento y queda ligada a la prueba que pasó. Con `'client'` se usa el snapshot que manda el widget, como en v1.1.

La respuesta incluye `photo_source` (`frame`|`client`), `photo_frame` (índice) y `photo_metrics` (`yaw`, `pitch_dev`, `ear`, `mouth`, `sharpness`, `score` y `frontal`, que indica si cumple los umbrales de una foto de frente). El token firma `photo_source` y `photo_frontal`.

> Requiere el `verify_liveness.py` de v1.2: vuelve a publicarlo con `php artisan vendor:publish --tag=liveness-python --force`. Con un script anterior el servidor usa el snapshot del cliente (`photo_source: client`).
>
> Los frames, igual que el snapshot, se capturan espejados (vista selfie).

## Video como evidencia (opcional)

Apagado por defecto. Se activa con `LIVENESS_RECORD_VIDEO=true` (o `'record_video' => true`).

- El widget graba con `MediaRecorder` mientras dura el reto, sin audio, y lo envía junto con los frames. Prefiere MP4/H.264 (se reproduce en cualquier navegador) y cae a webm/VP8 si no está disponible; el orden se cambia con `video_mime_types`. VP9 queda al final porque el que graba Safari iOS no se reproduce en Chrome de escritorio.
- El servidor **solo guarda el video si la prueba pasa**, en `videos_disk` (default: `photos_disk`) bajo `videos_path`. Valida tamaño (`video_max_size`) y que el contenido sea webm/mp4 real.
- Si el navegador no soporta `MediaRecorder` o el video excede el límite, la prueba sigue funcionando sin video (`video_path: null`).

Respuesta de `POST /liveness/verify` cuando pasa:

```json
{
  "passed": true, "confidence": 88, "token": "…",
  "photo_url":  "https://app.test/liveness/photo/20261027_171746_79d86216_sonre.jpg",
  "photo_path": "liveness/photos/20261027_171746_79d86216_sonre.jpg",
  "video_path": "liveness/videos/20261027_171746_aa8a5ac2_sonre.webm"
}
```

El token firmado incluye las mismas rutas en los claims `photo` y `video` (además de `challenge` y `confidence`). **Toma las rutas del token verificado, no de los hidden inputs**, que el cliente puede alterar:

```php
$r = liveness_token_verify($request->liveness_token, config('liveness.secret_key'), config('liveness.min_confidence'));
abort_unless($r['valid'], 422);

$disk = Storage::disk(config('liveness.videos_disk') ?? config('liveness.photos_disk'));
if ($video = $r['payload']['video'] ?? null) {
    Storage::disk('s3')->writeStream("evidencias/{$id}/" . basename($video), $disk->readStream($video));
    $disk->delete($video);
}
```

> El límite de duración (`video_max_duration_ms`) se aplica en el navegador; el servidor garantiza el de tamaño. Revisa que `post_max_size` de PHP cubra el base64 del video (~1.37× su tamaño) más los frames.

---

## Middleware

Para proteger rutas que requieren verificación de identidad:

```php
Route::post('/accion', [Controller::class, 'accion'])
     ->middleware('liveness');
```

---

## Configuración (`config/liveness.php`)

```php
return [
    'python_path'       => env('LIVENESS_PYTHON', null),
    'script_path'       => env('LIVENESS_SCRIPT', null),
    'secret_key'        => env('LIVENESS_SECRET', env('APP_KEY')),
    'token_ttl'         => 1800,   // segundos (30 min)
    'min_confidence'    => 60,     // 0-100
    'timeout'           => 60,     // segundos proceso Python
    'max_frames'        => 25,
    'max_snapshot_size' => 800000,
    'challenges'        => ['parpadea', 'derecha', 'izquierda', 'sonrie'],
    'photos_disk'       => 'local',
    'photos_path'       => 'liveness/photos',
    'photo_source'      => 'frame',  // 'frame' (elige el servidor) | 'client' (snapshot del widget)
    'record_video'          => env('LIVENESS_RECORD_VIDEO', false),
    'video_max_size'        => 4000000,  // bytes
    'video_max_duration_ms' => 8000,
    'video_bitrate'         => 500000,   // bits/s
    'video_mime_types'      => ['video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp8', 'video/webm', 'video/webm;codecs=vp9'],
    'videos_disk'           => null,     // null = photos_disk
    'videos_path'           => 'liveness/videos',
    'log_channel'       => env('LIVENESS_LOG_CHANNEL', 'stack'),
    'middleware'        => ['web'],
];
```

### Middleware de rutas

Por defecto las rutas del paquete (`/liveness/verify`, `/liveness/photos`, `/liveness/photo/{filename}`) usan `['web']`. Puedes sobreescribir el stack en tu `config/liveness.php` publicado para inyectar middleware adicional sin modificar el vendor:

```php
// Ejemplo para apps multi-tenant (stancl/tenancy)
'middleware' => [
    'web',
    \Stancl\Tenancy\Middleware\InitializeTenancyBySubdomain::class,
],
```

---

## Requisitos del servidor

- PHP 8.1+ con `proc_open` habilitado
- Python 3.8+ con `mediapipe`, `opencv-python`, `numpy`
- Laravel 10, 11 o 12+
- HTTPS en producción (requerido por los navegadores para acceder a la cámara en móviles)
- En desarrollo se soporta HTTP en `localhost`, `127.0.0.1` y `lvh.me` / `*.lvh.me`

---

## Licencia

MIT — © 2026 Héctor Rodríguez ([@HecRdz98](https://github.com/HecRdz98))
