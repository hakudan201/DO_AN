<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'numOfPages',
        'ISBN',
        'description'
    ];

    public function bookcopies(): HasMany
    {
        return $this->hasMany(Bookcopy::class);
    }
}
