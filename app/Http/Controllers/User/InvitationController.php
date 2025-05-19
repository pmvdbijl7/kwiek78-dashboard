<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\InviteRequest;
use App\Http\Resources\InvitationResource;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\PersonData;
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
    public function index(): Response
    {
        // Define status sorting
        $statusOrder = "CASE
            WHEN status = 'klaargezet' THEN 1
            WHEN status = 'in afwachting' THEN 2
            WHEN status = 'verlopen' THEN 3
            WHEN status = 'geaccepteerd' THEN 4
            WHEN status = 'geannuleerd' THEN 5
            WHEN status = 'mislukt' THEN 6
            ELSE 7
        END";

        // Retrieve all invitations
        $invitations = InvitationResource::collection(
            Invitation::with('personData')
                ->orderByRaw($statusOrder)
                ->orderBy('sent_at', 'desc')
                ->get()
        );

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

        // Create person data if it doesn't exist
        $personData = PersonData::firstOrCreate(
            ['email' => $request->email],
            [
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
            ]
        );
    
        // Check if an invitation already exists for the person data
        $existingInvitation = Invitation::where('person_data_id', $personData->id)->first();
    
        // If an invitation already exists, update it
        // Otherwise, create a new invitation
        if ($existingInvitation) {
            $existingInvitation->update([
                'token' => $token,
                'roles' => $roles,
                'status' => 'in afwachting',
                'sent_at' => now(),
            ]);
            $invitation = $existingInvitation;
        } else {
            $invitation = Invitation::create([
                'person_data_id' => $personData->id,
                'token' => $token,
                'roles' => $roles,
                'status' => 'in afwachting',
                'sent_at' => now(),
            ]);
        }

        // Send invitation email
        Mail::to($personData->email)->send(new InvitationMail($invitation));

        // Log the invitation
        activity()
            ->performedOn($invitation)
            ->log('Uitnodiging verzonden naar ' . $personData->email);

        // Return response
        return to_route('invitations.index');
    }

    /**
     * Revoke an invitation
     */
    public function revoke(Invitation $invitation)
    {
        // Update invitation status
        $invitation->update([
            'token' => null,
            'status' => 'geannuleerd'
        ]);

        // Log the revocation
        activity()
            ->performedOn($invitation)
            ->log('Uitnodiging geannuleerd voor ' . $invitation->personData->email);

        return to_route('invitations.index');
    }

    /**
     * Resend an invitation
     */
    public function resend(Invitation $invitation)
    {
        // Generate a new random token for the invitation
        $token = Str::random(40);

        // Update invitation status
        $invitation->update([
            'token' => $token,
            'status' => 'in afwachting',
            'sent_at' => now(),
        ]);

        // Send invitation email
        Mail::to($invitation->personData->email)->send(new InvitationMail($invitation));

        // Log the resend
        activity()
            ->performedOn($invitation)
            ->log('Uitnodiging opnieuw verzonden naar ' . $invitation->personData->email);

        return to_route('invitations.index');
    }
}
