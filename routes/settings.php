<?php

use App\Http\Controllers\Settings\RoleController;
use Illuminate\Support\Facades\Route;

// Roles
Route::get('instellingen/rollen', [RoleController::class, 'index'])->middleware(['auth', 'permission:view roles'])->name('roles.index');
Route::post('instellingen/rollen', [RoleController::class, 'store'])->middleware(['auth', 'permission:create roles'])->name('roles.store');
Route::get('instellingen/rollen/{role:slug}', [RoleController::class, 'edit'])->middleware(['auth', 'permission:edit roles'])->name('roles.edit');
Route::patch('instellingen/rollen/{role:id}', [RoleController::class, 'update'])->middleware(['auth', 'permission:edit roles'])->name('roles.update');
Route::patch('instellingen/rollen/{role:id}/rechten', [RoleController::class, 'updatePermissions'])->middleware(['auth', 'permission:edit roles'])->name('roles.permissions.update');
Route::delete('instellingen/rollen/{role:id}', [RoleController::class, 'destroy'])->middleware(['auth', 'permission:delete roles'])->name('roles.destroy');