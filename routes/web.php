<?php

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

Route::get('users', [UserController::class, 'index'])->middleware(['auth'])->name('users.index');
Route::get('users/invitations', [InvitationController::class, 'index'])->middleware(['auth'])->name('invitations.index');
Route::post('users/invitations', [InvitationController::class, 'invite'])->middleware(['auth'])->name('invitations.invite');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
