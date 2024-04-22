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
        Schema::create('bookcopies', function (Blueprint $table) {
            $table->id();
            $table->integer('book_id');
            $table->integer('publisher_id');
            $table->integer('library_id');
            $table->integer('year_published');
            $table->string('language');
            $table->string('format');
            $table->integer('price');
            $table->enum('status', ['Available', 'Reserved', 'Borrowed', 'Lost', 'Mainternance']);
            $table->string('location');
            $table->timestamps();

            $table->foreign('book_id')->references('id')->on('books');
            $table->foreign('publisher_id')->references('id')->on('publishers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookcopies');
    }
};
