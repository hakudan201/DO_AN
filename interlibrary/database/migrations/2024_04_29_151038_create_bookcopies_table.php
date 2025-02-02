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
            $table->foreignId('book_id')->constrained()->cascadeOnDelete();
            $table->string('ISBN')->unique();
            $table->integer('numOfPages');
            $table->integer('year_published');
            $table->string('format');
            $table->enum('status', ['Available', 'Reserved', 'Borrowed', 'Lost', 'Maintenance']);
            $table->string('location');
            $table->integer('price');
            $table->foreignId('library_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
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
