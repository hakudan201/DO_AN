<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Library;
use App\Models\User;
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
        if ($curr_user->role == 'admin') {
            $books = Book::with('genres')->get();
            return Inertia::render('Books/AdminIndex', [
                'books' => $books,
            ]);
        } else if ($curr_user->role == 'librarian') {
            $library_id = $curr_user->library_id;
            $lib_name = Library::where('id', $library_id)->first()->name;
            $books = Book::withCount(['bookcopies' => function ($query) use ($library_id) {
                $query->where('library_id', $library_id);
            }])
                ->having('bookcopies_count', '>', 0) // Filter books with count > 0
                ->with(['genres' => function ($query) {
                    $query->select('name'); // Select only the 'name' column from the genres table
                }])
                ->get();
            return Inertia::render('Books/LibIndex', [
                'books' => $books,
                'lib_name' => $lib_name
            ]);
            // return $books;
        }
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
    public function show($book_id, $library_id)
    {
        // $book = Book::find($book_id);
        // return Inertia::render('Books/Edit', [
        //     'book' => $book
        // ]);
        return 'ok';
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
    public function update(Request $request, Book $book)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'description' => 'required|string|max:25555',
        ]);
        $book->update($validatedData);
        return response()->json(['message' => 'Library updated successfully', 'book' => $book]);
    }

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
