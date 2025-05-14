<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    /**
     * Show the notifications page.
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        // Retrieve all notifications for the authenticated user
        $notifications = Auth::user()->notifications()->latest()->get();

        // Return the Inertia response with notifications
        return Inertia::render('notifications/notifications', [
            'notifications' => NotificationResource::collection($notifications),
        ]);
    }

    /**
     * Mark a notification as read.
     */
    public function markAsRead(DatabaseNotification $notification)
    {
        // Mark the notification as read
        $notification->markAsRead();

        // Redirect back to the notifications page
        return to_route('notifications.index');
    }

    /**
     * Mark a notification as unread.
     */
    public function markAsUnread(DatabaseNotification $notification)
    {
        // Mark the notification as unread
        $notification->markAsUnread();

        // Redirect back to the notifications page
        return to_route('notifications.index');
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead()
    {
        // Mark all notifications as read
        Auth::user()->unreadNotifications->markAsRead();

        // Redirect back to the notifications page
        return to_route('notifications.index');
    }

    /**
     * Mark all notifications as unread.
     */
    public function markAllAsUnread()
    {
        // Mark all notifications as unread
        Auth::user()->notifications->markAsUnread();

        // Redirect back to the notifications page
        return to_route('notifications.index');
    }
}
