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
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class SetPasswordController extends Controller
{
    /**
     * Show the set password page
     */
    public function create($token): Response
    {
        // Check if the token exists in the invitations table
        $invitation = Invitation::where('token', $token)->first();

        // If the token does not exist, return a 404 error
        if (!$invitation) {
            abort(404);
        }

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

        // Check if invitation is pending
        if ($invitation->status !== 'in afwachting') {
            // Redirect back with error message
            return back()->with('error', 'This invitation is no longer valid.');
        }

        // Create new user
        $user = User::create([
            'person_data_id' => $invitation->person_data_id,
            'slug' => $invitation->personData->slug,
            'email' => $invitation->personData->email,
            'password' => Hash::make($request->password),
        ]);

        // Extract role IDs from the invitation
        $invitedRoleIds = collect($invitation->roles)->pluck('id')->toArray();

        // Get only the existing roles based on ID
        $existingRoles = Role::whereIn('id', $invitedRoleIds)->get();

        // Assign only existing roles to the user
        if ($existingRoles->isNotEmpty()) {
            $user->assignRole($existingRoles);
        }

        // Update invitation status
        $invitation->update([
            'token' => null,
            'status' => 'geaccepteerd',
            'accepted_at' => now(),
        ]);

        // Register new user
        event(new Registered($user));

        // Login new user
        Auth::login($user);

        // Redirect to dashboard page
        return to_route('dashboard');
    }
}