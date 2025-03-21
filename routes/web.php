<?php

use App\Http\Controllers\Settings\RoleController;
use App\Http\Controllers\User\InvitationController;
use App\Http\Controllers\User\UserController;
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

Route::get('users', [UserController::class, 'index'])->middleware(['auth', 'permission:view users'])->name('users.index');
Route::get('users/invitations', [InvitationController::class, 'index'])->middleware(['auth', 'permission:view invitations'])->name('invitations.index');
Route::post('users/invitations', [InvitationController::class, 'invite'])->middleware(['auth', 'permission:create invitations'])->name('invitations.invite');
Route::patch('users/invitation/{id}/revoke', [InvitationController::class, 'revoke'])->middleware(['auth', 'permission:revoke invitations'])->name('invitation.revoke');
Route::patch('users/invitation/{id}/resend', [InvitationController::class, 'resend'])->middleware(['auth', 'permission:resend invitations'])->name('invitation.resend');

Route::get('settings/roles', [RoleController::class, 'index'])->middleware(['auth'])->name('roles.index');

require __DIR__ . '/profile-settings.php';
require __DIR__ . '/auth.php';
