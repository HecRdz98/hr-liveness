@once
    @push('scripts')
        <script src="{{ asset('vendor/liveness/liveness-widget.umd.js') }}"></script>
    @endpush
@endonce

{{-- Hidden input para el token de verificación --}}
<input type="hidden"
       name="{{ $name }}"
       id="{{ $name }}"
       value="{{ old($name) }}">

{{-- Hidden input para la URL de la foto (evidencia) --}}
<input type="hidden"
       name="{{ $name }}_photo"
       id="{{ $name }}_photo"
       value="{{ old($name . '_photo') }}">

@php
    // El servidor descarta el video si record_video está apagado en config,
    // así que la prop solo puede apagarlo para este campo, no forzarlo.
    $_lvRecordVideo = config('liveness.record_video', false) && ($recordVideo ?? true);
@endphp

@if($_lvRecordVideo)
{{-- Hidden input para la ruta del video (evidencia). La fuente confiable es el claim "video" del token. --}}
<input type="hidden"
       name="{{ $name }}_video"
       id="{{ $name }}_video"
       value="{{ old($name . '_video') }}">
@endif

{{-- Contenedor donde se monta el widget --}}
<div id="{{ $name }}-liveness-mount"></div>

@php
    $_lvTheme = array_filter(array_merge(
        ['brandName'   => $brandName  ?? config('liveness.brand_name', config('app.name'))],
        $brandSubtitle ? ['brandSubtitle' => $brandSubtitle] : [],
        $primaryColor  ? ['colorPrimary'  => $primaryColor]  : [],
        $accentColor   ? ['colorAccent'   => $accentColor]   : [],
        $bgColor       ? ['colorBg'       => $bgColor]       : [],
        $surfaceColor  ? ['colorSurface'  => $surfaceColor]  : [],
        $textColor     ? ['colorText'     => $textColor]     : [],
        $successColor  ? ['colorSuccess'  => $successColor]  : [],
        $dangerColor   ? ['colorDanger'   => $dangerColor]   : [],
        $theme
    ));
    $_lvChallenges = $challenges ?: config('liveness.challenges');
@endphp

@push('scripts')
<script>
(function () {
    var theme = @json($_lvTheme);

    new LivenessWidget('#{{ $name }}-liveness-mount', {
        endpoint:           '{{ route('liveness.verify') }}',
        photosEndpoint:     '{{ route('liveness.photos') }}',
        renderMode:         '{{ $renderMode }}',
        triggerLabel:       @json($triggerLabel),
        triggerClass:       @json($triggerClass),
        showSnapshot:       {{ $showSnapshot ? 'true' : 'false' }},
        showGallery:        {{ $showGallery  ? 'true' : 'false' }},
        tokenInputSelector: '#{{ $name }}',
        photoInputSelector: '#{{ $name }}_photo',
        photoMaxWidth:      {{ $photoMaxWidth ?? 'null' }},
        photoMaxHeight:     {{ $photoMaxHeight ?? 'null' }},
        photoQuality:       {{ $photoQuality }},
        recordVideo:        {{ $_lvRecordVideo ? 'true' : 'false' }},
        videoInputSelector: {!! $_lvRecordVideo ? "'#" . $name . "_video'" : 'null' !!},
        videoMaxDurationMs: {{ (int) config('liveness.video_max_duration_ms', 8000) }},
        videoMaxBytes:      {{ (int) config('liveness.video_max_size', 4000000) }},
        videoBitsPerSecond: {{ (int) config('liveness.video_bitrate', 500000) }},
        @if(config('liveness.video_mime_types'))
        videoMimeTypes:     @json(array_values(config('liveness.video_mime_types'))),
        @endif
        challenges:         @json($_lvChallenges),
        theme:              theme,
        texts:              @json($texts),
        onSuccess: function (result) {
            var input = document.getElementById('{{ $name }}');
            if (input) input.dispatchEvent(new Event('change', { bubbles: true }));

            @if($lockOnSuccess)
            var mount = document.getElementById('{{ $name }}-liveness-mount');
            if (mount) {
                mount.querySelectorAll('[data-lv-action="reiniciar"]').forEach(function (b) {
                    b.style.display = 'none';
                });
                setTimeout(function () {
                    var closeBtn = mount.querySelector('.lv-modal-close');
                    if (closeBtn) closeBtn.click();
                    setTimeout(function () {
                        var trigger = mount.querySelector('.lv-trigger-btn');
                        if (!trigger) return;
                        trigger.disabled = true;
                        trigger.innerHTML =
                            '<i class="bi bi-check-circle-fill me-1" style="color:#00e5a0"></i>' +
                            '<span>Verificado</span>';
                        Object.assign(trigger.style, {
                            opacity:       '1',
                            cursor:        'default',
                            background:    'rgba(0,229,160,.15)',
                            border:        '1.5px solid #00e5a0',
                            color:         '#00e5a0',
                            pointerEvents: 'none',
                        });
                    }, 120);
                }, 2500);
            }
            @endif
        },
    });
})();
</script>
@endpush
