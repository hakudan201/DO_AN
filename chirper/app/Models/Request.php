<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Request extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'requests'; // Tên bảng trong cơ sở dữ liệu

    protected $fillable = [
        'id',
        'user_id',
        'book_id',
        'borrow_date',
        'checkout_date',
        'due_date',
        'return_date',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class); // Mối quan hệ belongsTo với mô hình User
    }

    public function book()
    {
        return $this->belongsTo(Book::class); // Mối quan hệ belongsTo với mô hình Book
    }
}
