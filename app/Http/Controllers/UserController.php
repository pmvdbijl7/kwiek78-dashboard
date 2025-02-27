<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display the users page
     */
    public function index()
    {
        // Retrieve all users sorted by role
        $users = User::with('roles')
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->select('users.*')
            ->selectRaw('(SELECT MIN(role_id) FROM model_has_roles WHERE model_has_roles.model_id = users.id) AS min_role_id')
            ->orderBy('min_role_id', 'asc')
            ->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }
}
