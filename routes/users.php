<?php

use App\Http\Controllers\User\InvitationController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

// Invitations
Route::get('gebruikers/uitnodigingen', [InvitationController::class, 'index'])->middleware(['auth', 'permission:view invitations'])->name('invitations.index');
Route::post('gebruikers/uitnodigingen', [InvitationController::class, 'invite'])->middleware(['auth', 'permission:create invitations'])->name('invitations.invite');
Route::patch('gebruikers/uitnodigingen/{invitation:id}/revoke', [InvitationController::class, 'revoke'])->middleware(['auth', 'permission:revoke invitations'])->name('invitation.revoke');
Route::patch('gebruikers/uitnodigingen/{invitation:id}/resend', [InvitationController::class, 'resend'])->middleware(['auth', 'permission:resend invitations'])->name('invitation.resend');

// Users
Route::get('gebruikers', [UserController::class, 'index'])->middleware(['auth', 'permission:view users'])->name('users.index');
Route::get('gebruikers/{user:slug}', [UserController::class, 'edit'])->middleware(['auth', 'permission:edit users'])->name('users.edit');
Route::patch('gebruikers/{user:id}', [UserController::class, 'update'])->middleware(['auth', 'permission:edit users'])->name('users.update');
Route::delete('gebruikers/{user:id}', [UserController::class, 'destroy'])->middleware(['auth', 'permission:delete users'])->name('users.destroy');