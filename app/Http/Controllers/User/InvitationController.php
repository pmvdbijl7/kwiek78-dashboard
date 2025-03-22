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
        // Define status sorting
        $statusOrder = "CASE
            WHEN status = 'pending' THEN 1
            WHEN status = 'expired' THEN 2
            WHEN status = 'accepted' THEN 3
            WHEN status = 'revoked' THEN 4
            WHEN status = 'failed' THEN 5
            ELSE 6
        END";

        // Retrieve all invitations
        $invitations = Invitation::orderByRaw($statusOrder)->orderBy('sent_at', 'desc')->get();

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
            'status' => 'pending',
            'sent_at' => now(),
        ]);

        // Send invitation email
        Mail::to($request->email)->send(new InvitationMail($invitation));

        // Return response
        return to_route('invitations.index');
    }

    /**
     * Revoke an invitation
     */
    public function revoke($id)
    {
        // Retrieve invitation
        $invitation = Invitation::where('id', $id)->first();

        // Update invitation status
        $invitation->update([
            'status' => 'revoked'
        ]);

        return to_route('invitations.index');
    }

    /**
     * Resend an invitation
     */
    public function resend($id)
    {
        // Retrieve invitation
        $invitation = Invitation::where('id', $id)->first();

        // Update invitation status
        $invitation->update([
            'status' => 'pending',
            'sent_at' => now(),
        ]);

        // Send invitation email
        Mail::to($invitation->email)->send(new InvitationMail($invitation));

        return to_route('invitations.index');
    }
}
