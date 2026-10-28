# Changelog

## v1.1.1 — 2026-10-28
- Texto del spinner: «Analizando...» en lugar de «Analizando con IA...»

## v1.1.0 — 2026-10-27
- Video opcional de la prueba de vida (`record_video`, apagado por defecto): el widget graba con MediaRecorder (webm/mp4) durante el reto y el servidor lo guarda solo si la prueba pasa
- Límites configurables: `video_max_size`, `video_max_duration_ms`, `video_bitrate`; disco y ruta en `videos_disk` / `videos_path`
- La respuesta de `/liveness/verify` agrega `video_path` y `photo_path` (rutas en el disco); `photo_url` no cambia
- El token firmado agrega los claims `photo` y `video` cuando existen; `challenge` y `confidence` se mantienen
- Prop `record-video` en el componente y hidden input `{name}_video`

## v1.0.0 — 2026-05-11
- Versión inicial del paquete
- Widget JS embebible con soporte white-label
- Detección de liveness con MediaPipe (EAR + Yaw + boca)
- Token HMAC stateless
- Blade component `<x-liveness::field>`
- Validation Rule `Rule::liveness()`
- Middleware `RequiresLivenessToken`
- Artisan command `liveness:install`
- Guardado de foto como evidencia con redimensionado configurable
