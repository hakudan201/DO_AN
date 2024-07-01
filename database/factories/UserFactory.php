<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('12345678'),
            'remember_token' => Str::random(10),
            'DOB' => $this->faker->date('Y-m-d'), // Generate a random date of birth
            'address' => $this->faker->address(), // Generate a fake address
            'phone' => '0' . $this->faker->numerify('#########'),
            'role' => $this->faker->randomElement(['member', 'librarian']), // Random role
            'library_id' => $this->faker->numberBetween(1, 10), // Random library ID
            'due_membership' => $this->faker->date('Y-m-d', '+1 year') // Membership due date
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
