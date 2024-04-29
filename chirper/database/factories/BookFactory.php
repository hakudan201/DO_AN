<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class BookFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4), // Generate a random title (4 words)
            'numOfPages' => $this->faker->numberBetween(100, 500), // Random number of pages between 100 and 500
            'ISBN' => $this->faker->unique()->isbn10, // Generate a unique ISBN-10
            'description' => Str::limit($this->faker->paragraph(3), 200), // Generate a random description (3 paragraphs)
        ];
    }

}
