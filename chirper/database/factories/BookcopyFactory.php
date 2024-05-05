<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
// class BookcopyFactory extends Factory
// {
//     /**
//      * The current password being used by the factory.
//      */

//     /**
//      * Define the model's default state.
//      *
//      * @return array<string, mixed>
//      */
//     public function definition(): array
//     {
//         $statusOptions = ['Available', 'Reserved', 'Borrowed', 'Lost', 'Maintenance'];

//         return [
//             'book_id' => $this->faker->numberBetween(1, 50), // Example: assuming there are 50 books
//             'publisher_id' => $this->faker->numberBetween(1, 10), // Example: assuming there are 10 publishers
//             'library_id' => $this->faker->numberBetween(1, 5), // Example: assuming there are 5 libraries
//             'year_published' => $this->faker->numberBetween(1950, 2022),
//             'language' => $this->faker->languageCode,
//             'format' => $this->faker->randomElement(['Hardcover', 'Paperback', 'E-book']),
//             'price' => $this->faker->numberBetween(10, 100), // Example: price range between 10 and 100
//             'status' => $this->faker->randomElement($statusOptions),
//             'location' => $this->faker->address,
//             'created_at' => $this->faker->dateTimeBetween('-5 years', 'now'),
//             'updated_at' => now(),
//         ];
//     }

// }
