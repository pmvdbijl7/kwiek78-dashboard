<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\Role\RoleCreateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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
            ->orderBy('id')
            ->withCount('users')
            ->get();

        return Inertia::render('settings/roles/roles', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a new role
     */
    public function store(RoleCreateRequest $request)
    {
        // Create new role
        $role = Role::create([
            'name' => $request->name,
        ]);

        return to_route('roles.edit', $role->slug)->with('success', 'De ' . $role->name . ' rol is aangemaakt');
    }

    /**
     * Show the role edit page
     */
    public function edit(Role $role): Response
    {
        // Retrieve role permissions
        $rolePermissions = Role::findByName($role->name)->permissions;

        // Retrieve all permissions
        $permissions = Permission::all();

        return Inertia::render('settings/roles/edit', [
            'role' => $role,
            'rolePermissions' => $rolePermissions,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the role
     */
    public function update(Request $request, Role $role)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        // Update the role
        $role->update($request->only('name'));

        return to_route('roles.edit', $role->slug)->with('success', 'De ' . $role->name . ' rol is bijgewerkt');
    }

    /**
     * Update the role permissions
     */
    public function updatePermissions(Request $request, Role $role)
    {
        // Validate the request
        $request->validate([
            'permissions' => 'array',
        ]);

        // Sync the permissions
        $role->syncPermissions($request->permissions);

        return to_route('roles.edit', $role->slug)->with('success', 'De rechten voor de ' . $role->name . ' rol zijn bijgewerkt');
    }

    /**
     * Delete the role
     */
    public function destroy(Role $role)
    {
        // Check if the role is deletable
        if (!$role->deletable) {
            return back()->withErrors(['error' => 'Deze rol kan niet worden verwijderd']);
        }

        // Delete the role
        $role->delete();

        return to_route('roles.index')->with('success', 'De rol ' . $role->name . ' is verwijderd');
    }
}
