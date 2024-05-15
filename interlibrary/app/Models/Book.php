<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'description',
        'publisher'
    ];

    public function bookcopies()
    {
        return $this->hasMany(BookCopy::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genres_books');
    }
}
