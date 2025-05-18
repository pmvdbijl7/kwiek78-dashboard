<?php

namespace App\Http\Controllers;

use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $registration->update(['status' => 'geaccepteerd']);

        // Log the acceptance
        activity()
            ->performedOn($registration)
            ->log('Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' geaccepteerd.');

        return to_route('registrations.index')->with('success', 'Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' geaccepteerd.');
    }

    // Reject a registration
    public function reject(Registration $registration)
    {
        // Update the status
        $registration->update(['status' => 'afgewezen']);

        // Log the rejection
        activity()
            ->performedOn($registration)
            ->log('Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' afgewezen.');

        return to_route('registrations.index')->with('success', 'Aanmelding van ' . $registration->personData->firstname . ' ' . $registration->personData->lastname . ' afgewezen.');
    }
}
