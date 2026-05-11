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

### En una vista Blade

```blade
<form method="POST" action="{{ route('formulario.store') }}">
    @csrf

    <x-liveness::field
        name="liveness_token"
        brand-name="{{ config('app.name') }}"
        primary-color="#4f46e5"
    />

    @error('liveness_token')
        <p class="error">{{ $message }}</p>
    @enderror

    <button type="submit">Enviar</button>
</form>
```

### En el FormRequest

```php
use Illuminate\Support\Facades\Rule;

public function rules(): array
{
    return [
        'liveness_token' => ['required', Rule::liveness()],
        'liveness_photo' => ['nullable', 'string'],  // URL de la foto/evidencia
    ];
}
```

### En el Controller

```php
public function store(MiFormRequest $request)
{
    MiModelo::create([
        'liveness_token' => $request->liveness_token,
        'liveness_photo' => $request->liveness_photo,  // ruta en Storage
        'verified_at'    => now(),
    ]);
}

// Ver la foto de evidencia
$url = Storage::disk(config('liveness.photos_disk'))->url($modelo->liveness_photo);
```

---

## Props del componente `<x-liveness::field>`

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `name` | `string` | `liveness_token` | Nombre base de los hidden inputs |
| `brand-name` | `string` | `config('app.name')` | Nombre de marca en el widget |
| `brand-subtitle` | `string` | `null` | Subtítulo bajo la marca |
| `primary-color` | `string` | `null` | Color primario (`#4f46e5`) |
| `accent-color` | `string` | `null` | Color de acento |
| `challenges` | `array` | config | Desafíos: `['parpadea','sonrie',...]` |
| `theme` | `array` | `[]` | Opciones de tema adicionales |
| `texts` | `array` | `[]` | Override de textos / i18n |

El componente genera automáticamente:
- `<input type="hidden" name="{name}">` — token de verificación
- `<input type="hidden" name="{name}_photo">` — ruta de la foto evidencia

---

## Foto como evidencia

Cuando la verificación es exitosa, el backend guarda automáticamente un snapshot del usuario y devuelve la ruta. El widget la escribe en el hidden input `liveness_photo` para que llegue con el submit del formulario.

La foto se redimensiona antes de enviarse (configurable):

```javascript
// Defaults: 640×480 px, calidad JPEG 82%
photoMaxWidth:  640,
photoMaxHeight: 480,
photoQuality:   0.82,
```

---

## Middleware

Para proteger rutas que requieren verificación de identidad:

```php
Route::post('/accion', [Controller::class, 'accion'])
     ->middleware('liveness');
```

---

## Integración en formularios personalizados

```php
// En un ServiceProvider — registro como tipo de campo personalizado
CustomFormFields::register('liveness', [
    'label'     => 'Verificación Facial (Liveness)',
    'blade'     => 'liveness::components.field',
    'validator' => fn() => ['required', Rule::liveness()],
]);
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
    'log_channel'       => env('LIVENESS_LOG_CHANNEL', 'stack'),
];
```

---

## Requisitos del servidor

- PHP 8.1+ con `proc_open` habilitado
- Python 3.8+ con `mediapipe`, `opencv-python`, `numpy`
- Laravel 10, 11 o 12+
- **HTTPS en producción** (requerido por los navegadores para acceder a la cámara en móviles)

---

## Licencia

MIT — © 2026 Héctor Rodríguez ([@HecRdz98](https://github.com/HecRdz98))
