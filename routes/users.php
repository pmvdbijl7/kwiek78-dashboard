<?php

use App\Http\Controllers\User\InvitationController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

// Invitations
Route::get('users/invitations', [InvitationController::class, 'index'])->middleware(['auth', 'permission:view invitations'])->name('invitations.index');
Route::post('users/invitations', [InvitationController::class, 'invite'])->middleware(['auth', 'permission:create invitations'])->name('invitations.invite');
Route::patch('users/invitation/{invitation:id}/revoke', [InvitationController::class, 'revoke'])->middleware(['auth', 'permission:revoke invitations'])->name('invitation.revoke');
Route::patch('users/invitation/{invitation:id}/resend', [InvitationController::class, 'resend'])->middleware(['auth', 'permission:resend invitations'])->name('invitation.resend');

// Users
Route::get('users', [UserController::class, 'index'])->middleware(['auth', 'permission:view users'])->name('users.index');
Route::get('users/{user:slug}', [UserController::class, 'edit'])->middleware(['auth', 'permission:edit users'])->name('users.edit');
Route::patch('users/{user:id}', [UserController::class, 'update'])->middleware(['auth', 'permission:edit users'])->name('users.update');
Route::delete('users/{user:id}', [UserController::class, 'destroy'])->middleware(['auth', 'permission:delete users'])->name('users.destroy');