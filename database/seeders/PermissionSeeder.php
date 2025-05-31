<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define permissions with descriptions
        $permissions = [
            'view dashboard' => 'Toegang tot het hoofd-dashboard en het overzichtsscherm.',
            'view users' => 'Bekijk de lijst met geregistreerde gebruikers.',
            'create users' => 'Voeg nieuwe gebruikers toe aan het systeem.',
            'edit users' => 'Wijzig gebruikersinformatie en instellingen.',
            'delete users' => 'Verwijder gebruikers uit het systeem.',
            'view invitations' => 'Bekijk lopende en verzonden uitnodigingen.',
            'create invitations' => 'Stuur nieuwe uitnodigingen naar potentiële gebruikers.',
            'revoke invitations' => 'Annuleer bestaande uitnodigingen voordat ze worden geaccepteerd.',
            'resend invitations' => 'Stuur uitnodigingen opnieuw naar gebruikers die nog niet hebben gereageerd.',
            'view settings' => 'Toegang tot en bekijk de applicatie-instellingen.',
            'view roles' => 'Bekijk een lijst met bestaande rollen en hun rechten.',
            'create roles' => 'Definieer nieuwe rollen en wijs rechten toe.',
            'edit roles' => 'Wijzig rolrechten en details.',
            'delete roles' => 'Verwijder rollen uit het systeem.',
            'view registrations' => 'Bekijk de lijst met aanmeldingen.',
            'accept registrations' => 'Accepteer nieuwe aanmeldingen.',
            'reject registrations' => 'Weiger nieuwe aanmeldingen.',
        ];

        // Create permissions with descriptions
        foreach ($permissions as $name => $description) {
            Permission::firstOrCreate(
                ['name' => $name],
                ['description' => $description]
            );
        }

        // Assign permissions to the admin role
        $adminRole = Role::firstOrCreate(['name' => 'Super Admin', 'deletable' => false]);
        $adminRole->syncPermissions(array_keys($permissions));
    }
}
