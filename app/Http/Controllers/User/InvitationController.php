<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\InviteRequest;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class InvitationController extends Controller
{
    /**
     * Show the invitations overview page
     */
    public function index(Request $request): Response
    {
        // Retrieve all invitations
        $invitations = Invitation::get();

        // Retrieve all roles
        $roles = Role::whereNot('name', 'Super Admin')->get();

        // Return the Inertia response
        return Inertia::render('users/invitations', [
            'invitations' => $invitations,
            'roles' => $roles,
        ]);
    }

    /**
     * Invite new user
     */
    public function invite(InviteRequest $request)
    {
        // Generate a random token for the invitation
        $token = Str::random(40);

        // Retrieve the roles with IDs and names
        $roles = Role::whereIn('id', $request->roles)->get(['id', 'name']);

        // Create a new invitation
        $invitation = Invitation::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'token' => $token,
            'roles' => $roles,
        ]);

        // Send invitation email
        Mail::to($request->email)->send(new InvitationMail($invitation));

        // Return response
        return to_route('invitations.index');
    }
}
