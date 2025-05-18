<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('meldingen', [NotificationController::class, 'index'])->middleware(['auth'])->name('notifications.index');
Route::patch('meldingen/{notification:id}/mark-as-read', [NotificationController::class, 'markAsRead'])->middleware(['auth'])->name('notification.markAsRead');
Route::patch('meldingen/{notification:id}/mark-as-unread', [NotificationController::class, 'markAsUnread'])->middleware(['auth'])->name('notification.markAsUnread');
Route::patch('meldingen/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->middleware(['auth'])->name('notifications.markAllAsRead');
Route::patch('meldingen/mark-all-as-unread', [NotificationController::class, 'markAllAsUnread'])->middleware(['auth'])->name('notifications.markAllAsUnread');

Route::get('aanmeldingen', [RegistrationController::class, 'index'])->middleware(['auth', 'permission:view registrations'])->name('registrations.index');
Route::get('aanmeldingen/{registration:id}', [RegistrationController::class, 'show'])->middleware(['auth', 'permission:view registrations'])->name('registrations.show');
Route::patch('aanmeldingen/{registration:id}/accept', [RegistrationController::class, 'accept'])->middleware(['auth', 'permission:accept registrations'])->name('registration.accept');
Route::patch('aanmeldingen/{registration:id}/reject', [RegistrationController::class, 'reject'])->middleware(['auth', 'permission:reject registrations'])->name('registration.reject');

require __DIR__ . '/auth.php';
require __DIR__ . '/users.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/profile-settings.php';
