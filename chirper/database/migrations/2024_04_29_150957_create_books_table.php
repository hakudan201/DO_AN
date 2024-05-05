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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->integer('numOfPages');
            $table->string('ISBN')->unique();
            $table->string('description');
            $table->integer('library_id');
            $table->string('publisher');
            $table->integer('year_published');
            $table->string('language');
            $table->string('format');
            $table->integer('price');
            $table->enum('status', ['Available', 'Reserved', 'Borrowed', 'Lost', 'Maintenance']);
            $table->string('location');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
