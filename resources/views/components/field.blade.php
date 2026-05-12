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

{{-- Botón trigger (solo en modo modal) --}}
@if ($renderMode === 'modal')
<button type="button" id="{{ $name }}-liveness-trigger">
    {{ $triggerLabel }}
</button>
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
        triggerSelector:    @if ($renderMode === 'modal') '#{{ $name }}-liveness-trigger' @else null @endif,
        showSnapshot:       {{ $showSnapshot ? 'true' : 'false' }},
        showGallery:        {{ $showGallery  ? 'true' : 'false' }},
        tokenInputSelector: '#{{ $name }}',
        photoInputSelector: '#{{ $name }}_photo',
        photoMaxWidth:      {{ $photoMaxWidth ?? 'null' }},
        photoMaxHeight:     {{ $photoMaxHeight ?? 'null' }},
        photoQuality:       {{ $photoQuality }},
        challenges:         @json($_lvChallenges),
        theme:              theme,
        texts:              @json($texts),
        onSuccess: function (result) {
            var input = document.getElementById('{{ $name }}');
            if (input) input.dispatchEvent(new Event('change', { bubbles: true }));
        },
    });
})();
</script>
@endpush
