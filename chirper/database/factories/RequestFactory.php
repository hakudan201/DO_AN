<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

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
        $bookId = Book::inRandomOrder()->first()->id;

        // Tính toán ngày mượn, ngày trả và trạng thái dựa trên ngày mượn và trả
        $borrow_date = $this->faker->dateTimeBetween('-10 years', 'now')->format('Y-m-d');
        $checkout_date = $this->faker->boolean() ? $this->faker->dateTimeBetween($borrow_date, '+3 days')->format('Y-m-d') : null;
        $return_date = $checkout_date ? ($this->faker->boolean() ? $this->faker->dateTimeBetween($checkout_date, '+3 days')->format('Y-m-d') : null) : null;
        $status = $checkout_date ? ($return_date ? 'Returned' : 'Active') : 'Pending';

        return [
            'user_id' => $userId,
            'book_id' => $bookId,
            'borrow_date' => $borrow_date,
            'checkout_date' => $checkout_date,
            'due_date' => $checkout_date ? date('Y-m-d', strtotime($checkout_date . ' + 7 days')) : null,
            'return_date' => $return_date,
            'status' => $status,
        ];
    }
}
