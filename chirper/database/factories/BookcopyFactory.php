<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class BookcopyFactory extends Factory
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
        $statusOptions = ['Available', 'Reserved', 'Borrowed', 'Lost', 'Maintenance'];

        return [
            'book_id' => $this->faker->numberBetween(1, 50), // Example: assuming there are 50 books
            'ISBN' => $this->faker->unique()->isbn10, // Generate a unique ISBN-10
            'publisher' => $this->faker->company,
            'numOfPages' => $this->faker->numberBetween(100, 500), // Random number of pages between 100 and 500
            'library_id' => $this->faker->numberBetween(1, 2), // Example: assuming there are 5 libraries
            'year_published' => $this->faker->numberBetween(1950, 2022),
            'format' => $this->faker->randomElement(['Hardcover', 'Paperback', 'E-book']),
            'price' => $this->faker->numberBetween(10, 100), // Example: price range between 10 and 100
            'status' => $this->faker->randomElement($statusOptions),
            'location' => $this->faker->address,
            'created_at' => $this->faker->dateTimeBetween('-5 years', 'now'),
            'updated_at' => now(),
        ];
    }

}
