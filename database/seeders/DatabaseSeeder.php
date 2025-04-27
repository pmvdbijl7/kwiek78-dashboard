<?php

namespace Database\Seeders;

use App\Models\PersonData;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Super Admin role
        $adminRole = Role::firstOrCreate(['slug' => 'super-admin', 'name' => 'Super Admin']);

        // Create person data
        $personData = PersonData::firstOrCreate([
            'slug' => 'patrick-van-der-bijl',
            'firstname' => 'Patrick',
            'lastname' => 'van der Bijl',
            'email' => 'pmvdbijl7@gmail.com',
            'phone' => '+31615220551',
        ]);

        // Create super admin user
        $adminUser = User::firstOrCreate([
            'person_data_id' => $personData->id,
            'slug' => $personData->slug,
            'email' => $personData->email,
            'password' => bcrypt('pmvdbijl7'),
        ]);

        // Assign Super Admin role to super admin user
        $adminUser->assignRole($adminRole);
    }
}
