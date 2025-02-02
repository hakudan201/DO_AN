<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookcopy extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'ISBN',
        'numOfPages',
        'library_id',
        'year_published',
        'format',
        'price',
        'status',
        'location'
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function library()
    {
        return $this->belongsTo(Library::class);
    }

}
