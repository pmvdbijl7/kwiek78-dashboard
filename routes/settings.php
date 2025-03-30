<?php

use App\Http\Controllers\Settings\RoleController;
use Illuminate\Support\Facades\Route;

// Roles
Route::get('settings/roles', [RoleController::class, 'index'])->middleware(['auth', 'permission:view roles'])->name('roles.index');
Route::post('settings/roles', [RoleController::class, 'store'])->middleware(['auth', 'permission:create roles'])->name('roles.store');
Route::get('settings/roles/{role:slug}', [RoleController::class, 'edit'])->middleware(['auth', 'permission:edit roles'])->name('roles.edit');
Route::patch('settings/roles/{role:id}', [RoleController::class, 'update'])->middleware(['auth', 'permission:edit roles'])->name('roles.update');
Route::patch('settings/roles/{role:id}/permissions', [RoleController::class, 'updatePermissions'])->middleware(['auth', 'permission:edit roles'])->name('roles.permissions.update');
Route::delete('settings/roles/{role:id}', [RoleController::class, 'destroy'])->middleware(['auth', 'permission:delete roles'])->name('roles.destroy');