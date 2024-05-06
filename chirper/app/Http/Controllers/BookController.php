<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $curr_user = auth()->user();
        if ($curr_user->role == 'librarian') {
            $books = Book::where('library_id', $curr_user->library_id)
                    ->latest()->get();
            // $book = Book::where
            return Inertia::render('Books/Index', [
                'books' => $books,
                // 'books' => $books
            ]);
        }
        // $bookcopies = BookCopy::where('library_id', $curr_user->library_id)
        //             ->latest()
        //             ->with('book')->get();
        // return $bookcopies[1];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     $validated = $request->validate([
    //         'message' => 'required|string|max:255',
    //     ]);

    //     $request->user()->chirps()->create($validated);

    //     return redirect(route('chirps.index'));
    // }

    /**
     * Display the specified resource.
     */
    public function show($book_id)
    {
        $book = Book::find($book_id);
        return Inertia::render('Books/Edit', [
            'book' => $book
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Book $user)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, User $user): RedirectResponse
    // {
    //     Gate::authorize('update', $user);

    //     $validated = $request->validate([
    //         'message' => 'required|string|max:255',
    //     ]);

    //     $chirp->update($validated);

    //     return redirect(route('chirps.index'));
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Chirp $chirp): RedirectResponse
    // {
    //     Gate::authorize('delete', $chirp);

    //     $chirp->delete();

    //     return redirect(route('chirps.index'));
    // }
}
