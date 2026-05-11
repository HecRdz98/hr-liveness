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

{{-- Contenedor donde se monta el widget --}}
<div id="{{ $name }}-liveness-mount"></div>

<script>
(function () {
    var theme = @json(array_filter(array_merge(
        ['brandName' => $brandName ?? config('liveness.brand_name', config('app.name'))],
        $brandSubtitle ? ['brandSubtitle' => $brandSubtitle] : [],
        $primaryColor  ? ['colorPrimary'  => $primaryColor]  : [],
        $accentColor   ? ['colorAccent'   => $accentColor]   : [],
        $theme
    )));

    new LivenessWidget('#{{ $name }}-liveness-mount', {
        endpoint:          '{{ route('liveness.verify') }}',
        photosEndpoint:    '{{ route('liveness.photos') }}',
        renderMode:        'inline',
        tokenInputSelector: '#{{ $name }}',
        photoInputSelector: '#{{ $name }}_photo',
        photoMaxWidth:     {{ $photoMaxWidth ?? 'null' }},
        photoMaxHeight:    {{ $photoMaxHeight ?? 'null' }},
        photoQuality:      {{ $photoQuality }},
        challenges:        @json($challenges ?: config('liveness.challenges')),
        theme:             theme,
        texts:             @json($texts),
        onSuccess: function (result) {
            var input = document.getElementById('{{ $name }}');
            if (input) input.dispatchEvent(new Event('change', { bubbles: true }));
        },
    });
})();
</script>
