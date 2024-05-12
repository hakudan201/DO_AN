<?php

namespace Database\Factories;

use App\Models\Bookcopy;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Request>
 */
class RequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = User::where('role', 1)->inRandomOrder()->first()->id; // Sửa điều kiện lấy UserID
        $bookcopyId = Bookcopy::inRandomOrder()->first()->id;
        $statuses = ['pending', 'denied', 'ready', 'canceled', 'active', 'completed'];
        $status = $this->faker->randomElement($statuses);

        $borrowDate = $this->faker->dateTimeBetween('-3 days', 'now');

        $checkoutDate = null;
        if ($status === 'completed' || $status === 'active') {
            $checkoutDate = $this->faker->dateTimeBetween($borrowDate, '+2 days');
        }

        $returnDate = null;
        if ($checkoutDate !== null && $status === 'completed') {
            $returnDate = $this->faker->dateTimeBetween($checkoutDate, '+40 days');
        }

        $dueDate = null;
        if ($checkoutDate !== null) {
            $dueDate = Carbon::parse($checkoutDate)->addDays(30)->format('Y-m-d');
        }

        return [
            'user_id' => $userId,
            'bookcopy_id' => $bookcopyId,
            'borrow_date' => $borrowDate,
            'checkout_date' => $checkoutDate,
            'due_date' => $dueDate,
            'return_date' => $returnDate,
            'status' => $status,
        ];
    }
}
