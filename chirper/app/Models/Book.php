<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'numOfPages',
        'ISBN',
        'description',
        'author',
        'publisher',
        'library_id',
        'year_published',
        'language',
        'format',
        'price',
        'status',
        'location'
    ];
}
