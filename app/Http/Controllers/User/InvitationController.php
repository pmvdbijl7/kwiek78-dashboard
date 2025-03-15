<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    /**
     * Show the invitations overview page
     */
    public function index(Request $request): Response
    {

        // Return the Inertia response
        return Inertia::render('users/invitations');
    }
}
