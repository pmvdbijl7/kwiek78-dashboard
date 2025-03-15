<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show the users overview page
     */
    public function index(Request $request): Response
    {
        // Retrieve all users
        $users = User::whereDoesntHave('roles', function ($query) {
            $query->where('name', 'Super Admin');
        })->with('roles')->get();

        // Return the Inertia response
        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }
}
