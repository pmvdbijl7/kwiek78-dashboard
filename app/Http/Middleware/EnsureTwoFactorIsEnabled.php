<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTwoFactorIsEnabled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && !$request->user()->two_factor_confirmed_at) {
            return redirect()->route('profile.two-factor')->with('error', 'Tweestapsverificatie is vereist om deze pagina te bekijken');
        }

        return $next($request);
    }
}
