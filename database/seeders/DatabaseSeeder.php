<?php

namespace Database\Seeders;

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
        $adminRole = Role::create(['slug' => 'super-admin', 'name' => 'Super Admin']);

        // Create super admin user
        $adminUser = User::create([
            'slug' => 'patrick-van-der-bijl',
            'firstname' => 'Patrick',
            'lastname' => 'van der Bijl',
            'email' => 'pmvdbijl7@gmail.com',
            'phone' => '+31615220551',
            'password' => bcrypt('pmvdbijl7'),
        ]);

        // Assign Super Admin role to super admin user
        $adminUser->assignRole($adminRole);
    }
}
