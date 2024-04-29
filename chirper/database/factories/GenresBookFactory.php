<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Genre;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class GenresBookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genreId = Genre::inRandomOrder()->first()->id;
        $bookId = Book::inRandomOrder()->first()->id;
        return [
            'genre_id' => $genreId,
            'book_id' => $bookId
        ];
    }
}
