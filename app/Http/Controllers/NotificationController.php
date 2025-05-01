<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(): Response
    {
        // Retrieve all notifications for the authenticated user
        $notifications = Auth::user()->notifications()->latest()->get();

        // Return the Inertia response with notifications
        return Inertia::render('notifications/notifications', [
            'notifications' => $notifications,
        ]);
    }
}
