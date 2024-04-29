<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookcopy extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'publisher_id',
        'library_id',
        'year_published',
        'language',
        'format',
        'price',
        'status',
        'location'
    ];
}
