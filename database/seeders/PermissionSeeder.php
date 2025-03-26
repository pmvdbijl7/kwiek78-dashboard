<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define permissions with descriptions
        $permissions = [
            'view dashboard' => 'Access the main dashboard and overview page.',
            'view users' => 'View the list of registered users.',
            'create users' => 'Add new users to the system.',
            'edit users' => 'Modify user information and settings.',
            'delete users' => 'Remove users from the system.',
            'view invitations' => 'See pending and sent invitations.',
            'create invitations' => 'Send new invitations to potential users.',
            'revoke invitations' => 'Cancel existing invitations before they are accepted.',
            'resend invitations' => 'Resend invitations to users who have not responded.',
            'view settings' => 'Access and view application settings.',
            'view roles' => 'See a list of existing roles and their permissions.',
            'create roles' => 'Define new roles and assign permissions.',
            'edit roles' => 'Modify role permissions and details.',
            'delete roles' => 'Remove roles from the system.',
        ];

        // Create permissions with descriptions
        foreach ($permissions as $name => $description) {
            Permission::firstOrCreate(
                ['name' => $name],
                ['description' => $description]
            );
        }

        // Assign permissions to the admin role
        $adminRole = Role::firstOrCreate(['name' => 'Super Admin', 'slug' => 'super-admin']);
        $adminRole->syncPermissions(array_keys($permissions));
    }
}
