<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookcopyController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('users', UserController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('books', BookController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('bookcopies', BookcopyController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('libraries', LibraryController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('requests', RequestController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('genres', GenreController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::POST('/requests/updateStatus', [RequestController::class, 'updateStatus'])->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/getAllBook', [BookController::class, 'getAllBook']);
});

Route::GET('requests//interlibIndex', [RequestController::class, 'interlibIndex'])->middleware(['auth', 'verified'])->name('requests.interlibIndex');
Route::GET('requests//interlibShow', [RequestController::class, 'interlibShow'])->middleware(['auth', 'verified'])->name('requests.interlibShow');
Route::GET('/searchBooks', [BookController::class, 'searchBook']);
Route::GET('/viewBook', [BookController::class, 'viewBook']);

require __DIR__ . '/auth.php';
