<?php

namespace Database\Factories;

use App\Models\PersonData;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hasKnvbAffiliation = fake()->boolean();

        return [
            'person_data_id' => PersonData::factory(),
            'membership_type' => fake()->randomElement(['field', 'futsal', 'non_playing', 'member']),
            'has_knvb_affiliation' => $hasKnvbAffiliation,
            'club_name' => $hasKnvbAffiliation ? fake()->company() : null,
            'membership_end' => $hasKnvbAffiliation ? fake()->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d') : null,
            'knvb_relation_number' => $hasKnvbAffiliation ? fake()->randomNumber(8, true) : null,
            'comments' => fake()->text(),
            'status' => 'pending',
        ];
    }
}