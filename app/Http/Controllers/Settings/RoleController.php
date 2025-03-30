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

        return Inertia::render('settings/roles/overview', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a new role
     */
    public function store(RoleCreateRequest $request)
    {
        // Generate a slug
        $baseSlug = Str::slug($request->name);
        $slug = $this->generateUniqueSlug($baseSlug);

        // Create new role
        $role = Role::create([
            'name' => $request->name,
            'slug' => $slug,
        ]);

        return to_route('roles.edit', $role->slug);
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

        return to_route('roles.edit', $role->slug);
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

        return to_route('roles.edit', $role->slug);
    }

    /**
     * Delete the role
     */
    public function destroy(Role $role)
    {
        // Delete the role
        $role->delete();

        return to_route('roles.index');
    }

    /**
     * Generate a unique slug by checking if it already exists
     */
    private function generateUniqueSlug(string $baseSlug): string
    {
        $slug = $baseSlug;
        $count = 2;

        while (Role::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
