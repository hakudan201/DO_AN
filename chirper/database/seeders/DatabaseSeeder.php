<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Genre;
use App\Models\GenresBook;
use App\Models\User;
use App\Models\Library;
use App\Models\Request;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $libraries = Library::factory(2)->create();
        User::factory()->count(40)->create([
            'library_id' => function () use ($libraries) {
                return $libraries->random(); // Assign a random library to each user
            },
        ]);
        $books = Book::factory()->count(30)->create();
        // Author::factory()->count(20)->create();
        Genre::factory()->count(50)->create();
        // AuthorsBook::factory()->count(20)->create();
        GenresBook::factory()->count(70)->create();
        Bookcopy::factory()->count(100)->create([
            'library_id' => function () use ($libraries) {
                return $libraries->random(); // Assign a random library to each user
            },
            'book_id' => function () use ($books) {
                return $books->random();
            }
        ]);
        Request::factory()->count(70)->create();

        // $publishers = Publisher::factory()->count(10)->create();

    }
}
