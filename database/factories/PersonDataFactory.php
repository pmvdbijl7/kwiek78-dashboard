<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonData>
 */
class PersonDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstname = fake()->firstName();

        return [
            'gender' => fake()->randomElement(['man', 'vrouw', 'anders']),
            'initials' => strtoupper(
                substr($firstname, 0, 1) . 
                implode('', array_map(fn () => fake()->randomLetter(), range(1, rand(1, 2))))
            ),
            'firstname' => $firstname,
            'lastname' => fake()->lastName(),
            'date_of_birth' => fake()->date(),
            'nationality' => 'Nederlands',
            'zip_code' => fake()->postcode(),
            'house_number' => fake()->buildingNumber(),
            'street' => fake()->streetName(),
            'city' => fake()->city(),
            'country' => 'Nederland',
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'iban' => fake()->iban(),
            'bank_account_holder' => fake()->name(),
            'volunteer_roles' => json_encode([
                'role1' => fake()->word(),
                'role2' => fake()->word(),
            ]),
        ];
    }
}