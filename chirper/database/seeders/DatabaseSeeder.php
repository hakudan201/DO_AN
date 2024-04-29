<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Library;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $libraries = Library::factory(5)->create();
        User::factory()->count(40)->create([
            'library_id' => function () use ($libraries) {
                return $libraries->random(); // Assign a random library to each user
            },
        ]);
    }
}
