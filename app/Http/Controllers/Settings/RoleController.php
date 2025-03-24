<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Show the roles overview page
     */
    public function index(Request $request): Response
    {
        // Retrieve all roles
        $roles = Role::whereNot('name', 'Super Admin')
            ->withCount('users')
            ->get();

        return Inertia::render('settings/roles/overview', [
            'roles' => $roles,
        ]);
    }

    /**
     * Show the role edit page
     */
    public function edit(Role $role): Response
    {
        // Retrieve role permissions
        $permissions = Role::findByName($role->name)->permissions;

        return Inertia::render('settings/roles/edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }
}
