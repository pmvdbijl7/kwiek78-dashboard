<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function index()
    {
        // Retrieve all registrations
        $registrations = Registration::latest()->get();

        // Return the Inertia response with registrations
        return Inertia::render('registrations/registrations', [
            'registrations' => $registrations,
        ]);
    }

    public function show(Registration $registration)
    {
        // Return the Inertia response with the registration
        return Inertia::render('registrations/show', [
            'registration' => $registration,
        ]);
    }
}
