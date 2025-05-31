<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define roles
        $roles = [
            'Admin',
            'Voorzitter',
            'Secretaris',
            'Penningmeester',
            'Bestuurslid',
            'Hoofd technische zaken',
            'Hoofd jeugdopleiding',
            'Trainer/Coach',
            'Teammanager',
            'Speler',
            'Aanvoerder',
            'Ouder',
            'Wedstrijdsecretaris',
            'Scheidsrechter',
            'Ledenadministrateur',
            'Sponsormanager',
            'Communicatie',
            'Vrijwilligerscoördinator',
            'Evenementen coördinator',
            'Kantinebeheerder',
            'Materiaalbeheerder',
            'Vertrouwenspersoon',
        ];

        // Create roles
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role, 'deletable' => false]);
        }
    }
}
