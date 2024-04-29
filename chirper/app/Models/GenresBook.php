<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenresBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'genre_id',
        'book_id',
    ];
}
