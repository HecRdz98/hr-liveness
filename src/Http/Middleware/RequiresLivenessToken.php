<?php

namespace HR\Liveness\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequiresLivenessToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token  = $request->input('liveness_token') ?? $request->cookie('liveness_token');
        $result = liveness_token_verify(
            $token ?? '',
            config('liveness.secret_key'),
            config('liveness.min_confidence', 60)
        );

        if (!$result['valid']) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Verificación de identidad requerida.'], 403);
            }
            return back()->withErrors(['liveness_token' => 'Debes completar la verificación de identidad.']);
        }

        return $next($request);
    }
}
