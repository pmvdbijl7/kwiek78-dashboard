<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class SetPasswordController extends Controller
{
    /**
     * Show the set password page
     */
    public function create($token): Response
    {
        // Return Inertia response
        return Inertia::render('auth/set-password', [
            'token' => $token
        ]);
    }

    /**
     * Handle set password request
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate request
        $request->validate([
            'token' => 'required|exists:invitations,token',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Get invitation
        $invitation = Invitation::where('token', $request->token)->firstOrFail();

        // Create new user
        $user = User::create([
            'firstname' => $invitation->firstname,
            'lastname' => $invitation->lastname,
            'email' => $invitation->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign roles to new user
        $user->assignRole($invitation->roles);

        // Register new user
        event(new Registered($user));

        // Login new user
        Auth::login($user);

        // Delete invitation
        $invitation->delete();

        // Redirect to dashboard page
        return to_route('dashboard');
    }
}