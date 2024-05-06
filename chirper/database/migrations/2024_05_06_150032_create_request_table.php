<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('book_id')->constrained()->cascadeOnDelete();
            $table->date('borrow_date'); // Sửa borrow_date thành kiểu dữ liệu date
            $table->date('checkout_date')->nullable(); // Sửa checkout_date thành kiểu dữ liệu date
            $table->date('due_date')->nullable(); // Sửa due_date thành kiểu dữ liệu date
            $table->date('return_date')->nullable(); // Sửa return_date thành kiểu dữ liệu date và cho phép giá trị null
            $table->string('status'); // Sửa status thành kiểu dữ liệu string
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
