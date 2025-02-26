<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create new user
        User::create([
            'firstname' => 'Patrick',
            'lastname' => 'van der Bijl',
            'email' => 'pmvdbijl7@gmail.com',
            'phone' => '+31615220551',
            'password' => bcrypt('pmvdbijl7'),
        ]);
    }
}
