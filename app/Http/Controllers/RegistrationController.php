<?php

namespace App\Http\Controllers;

use App\Http\Resources\RegistrationResource;
use App\Mail\RegistrationAcceptedMail;
use App\Mail\RegistrationRejectedMail;
use App\Models\Invitation;
use App\Models\Registration;
use App\Models\User;
use App\Notifications\InvitationReadyNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RegistrationController extends Controller
{
    // Show all registrations
    public function index()
    {
        // Define status sorting
        $statusOrder = "CASE
            WHEN status = 'in afwachting' THEN 1
            WHEN status = 'geaccepteerd' THEN 2
            WHEN status = 'afgewezen' THEN 3
            ELSE 4
        END";

        // Retrieve all registrations
        $registrations = Registration::orderByRaw($statusOrder)->orderBy('created_at', 'desc')->get();

        // Return the Inertia response with registrations
        return Inertia::render('registrations/registrations', [
            'registrations' => RegistrationResource::collection($registrations),
        ]);
    }

    // Show a specific registration
    public function show(Registration $registration)
    {
        // Return the Inertia response with the registration
        return Inertia::render('registrations/show', [
            'registration' => new RegistrationResource($registration),
        ]);
    }
    
    // Accept a registration
    public function accept(Registration $registration)
    {
        // Update the status
        $registration->update([
            'status' => 'geaccepteerd',
            'reviewed_at' => now(),
        ]);

        // Send acceptance email
        Mail::to($registration->personData->email)->send(new RegistrationAcceptedMail($registration));

        // Create a new invitation
        Invitation::create([
            'person_data_id' => $registration->personData->id,
            'roles' => $this->getDefaultRolesForMembershipType($registration->membership_type),
            'status' => 'klaargezet',
        ]);

        // Retrieve all "Super Admin", "Admin", and "Voorzitter" users
        $users = User::whereHas('roles', fn ($query) => $query->whereIn('name', ['Super Admin', 'Admin', 'Voorzitter']))->get();

        // Send invitation ready email
        foreach ($users as $user) {
            $user->notify(new InvitationReadyNotification($registration));
        }

        // Log the acceptance
        activity()
            ->performedOn($registration)
            ->log('Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' geaccepteerd.');

        return to_route('registrations.index')->with('success', [
            'message' => 'Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' geaccepteerd.',
            'description' => 'Er is een e-mail verzonden naar ' . $registration->personData->email . ' met meer informatie. En er is een uitnodiging aangemaakt.',
        ]);
    }

    // Reject a registration
    public function reject(Registration $registration)
    {
        // Update the status
        $registration->update([
            'status' => 'afgewezen',
            'reviewed_at' => now(),
        ]);

        // Send rejection email
        Mail::to($registration->personData->email)->send(new RegistrationRejectedMail($registration));

        // Log the rejection
        activity()
            ->performedOn($registration)
            ->log('Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' afgewezen.');

        return to_route('registrations.index')->with('success', [
            'message' => 'Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' afgewezen.',
            'description' => 'Er is een e-mail verzonden naar ' . $registration->personData->email . ' met meer informatie.',
        ]);
    }

    // Helper function to get default roles based on membership type
    private function getDefaultRolesForMembershipType(string $membershipType): array
    {
        return match ($membershipType) {
            'veld', 'zaal' => [
                [
                    'id' => Role::where('name', 'Speler')->value('id'),
                    'name' => Role::where('name', 'Speler')->value('name'),
                ]
                ],
                default => [],
        };
    }
}
