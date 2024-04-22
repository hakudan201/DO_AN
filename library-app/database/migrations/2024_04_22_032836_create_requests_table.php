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
            $table->integer('user_id');
            $table->integer('book_copy_id');
            $table->date('reserve_date');
            $table->date('checkout_date');
            $table->date('due_date');
            $table->date('return_date');
            $table->enum('status', ['Reserved', 'Checked Out', 'Returned', 'Lost']);
            $table->integer('fee')->nullable();
            $table->timestamps();

            // $table->foreign('user_id')->references('id')->on('users');
            // $table->foreign('book_copy_id')->references('id')->on('books');
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
