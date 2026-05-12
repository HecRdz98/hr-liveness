<?php

namespace HR\Liveness\View\Components;

use Illuminate\View\Component;

class LivenessField extends Component
{
    public function __construct(
        public string  $name           = 'liveness_token',
        public string  $label          = 'Verificación de identidad',
        public ?string $brandName      = null,
        public ?string $brandSubtitle  = null,
        public ?string $primaryColor   = null,
        public ?string $accentColor    = null,
        public ?string $bgColor        = null,
        public ?string $surfaceColor   = null,
        public ?string $textColor      = null,
        public ?string $successColor   = null,
        public ?string $dangerColor    = null,
        public array   $challenges     = [],
        public array   $theme          = [],
        public array   $texts          = [],
        public ?int    $photoMaxWidth  = 640,
        public ?int    $photoMaxHeight = 480,
        public float   $photoQuality   = 0.82,
        public string  $renderMode     = 'inline',
        public string  $triggerLabel   = 'Verificar identidad',
        public bool    $showSnapshot   = true,
        public bool    $showGallery    = true,
    ) {}

    public function render()
    {
        return view('liveness::components.field');
    }
}
