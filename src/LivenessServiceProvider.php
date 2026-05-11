<?php

namespace HR\Liveness;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;

class LivenessServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/liveness.php', 'liveness');
    }

    public function boot(): void
    {
        // Publicar configuración
        $this->publishes([
            __DIR__ . '/../config/liveness.php' => config_path('liveness.php'),
        ], 'liveness-config');

        // Publicar assets (JS widget)
        $this->publishes([
            __DIR__ . '/../resources/assets/' => public_path('vendor/liveness/'),
        ], 'liveness-assets');

        // Publicar script Python (para colocarlo en el servidor)
        $this->publishes([
            __DIR__ . '/../resources/verify_liveness.py' => base_path('liveness/verify_liveness.py'),
        ], 'liveness-python');

        // Cargar vistas del paquete
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'liveness');

        // Registrar componentes Blade
        Blade::componentNamespace('HR\\Liveness\\View\\Components', 'liveness');

        // Registrar rutas
        $this->loadRoutesFrom(__DIR__ . '/../routes/liveness.php');

        // Registrar Rule::liveness() como macro
        \Illuminate\Validation\Rule::macro('liveness', function () {
            return new \HR\Liveness\Rules\LivenessToken();
        });

        // Registrar middleware alias
        $this->app['router']->aliasMiddleware('liveness', \HR\Liveness\Http\Middleware\RequiresLivenessToken::class);

        // Registrar comandos Artisan
        if ($this->app->runningInConsole()) {
            $this->commands([\HR\Liveness\Console\InstallCommand::class]);
        }
    }
}
