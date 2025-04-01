<?php

use App\Http\Controllers\ProfileSettings\PasswordController;
use App\Http\Controllers\ProfileSettings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('instellingen/profiel', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('instellingen/profiel', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('instellingen/profiel', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('instellingen/wachtwoord', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('instellingen/wachtwoord', [PasswordController::class, 'update'])->name('password.update');

    Route::get('instellingen/thema', function () {
        return Inertia::render('profile-settings/appearance');
    })->name('appearance');
});
