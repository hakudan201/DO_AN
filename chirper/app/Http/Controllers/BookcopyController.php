<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Bookcopy;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookcopyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $curr_user = auth()->user();
        // if ($curr_user->role == 'admin') {
        //     $books = Book::all();
        //     return Inertia::render('Books/AdminIndex', [
        //         'books' => $books,
        //     ]);
        // }
        // else if ($curr_user->role == 'librarian') {
        //     $library_id = $curr_user->library_id;
        //     $books = Book::withCount(['bookcopies' => function ($query) use ($library_id) {
        //         $query->where('library_id', $library_id);
        //     }])
        //     ->having('bookcopies_count', '>', 0) // Filter books with count > 0
        //     ->get();
        //     return Inertia::render('Books/LibIndex', [
        //         'books' => $books,
        //     ]);
        // }

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
        $library_id = auth()->user()->library_id;
        $book = Book::where('id', $book_id)->first()->title;
        $bookcopies = BookCopy::where('book_id', $book_id)
            ->where('library_id', $library_id)
            ->get();
        return Inertia::render('Bookcopies/Index', [
            'book' => $book,
            'bookcopies' => $bookcopies,
        ]);
        // return $book;
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
    public function update(Request $request, Bookcopy $bookcopy)
    {
        $validatedData = $request->validate([
            'ISBN' => 'required|string|max:10',
            'numOfPages' => 'required|integer',
            'year_published' => 'required|integer',
            'format' => 'required|string|max:255',
            'price' => 'required|integer',
            'status' => 'required',
            'location' => 'required'
        ]);
        $bookcopy->update($validatedData);
        return response()->json(['message' => 'Library updated successfully', 'bookcopy' => $bookcopy]);
    }
    public function createNewBookCopy(Request $request)
    {
        $curr_user = auth()->user();

        // Validate the incoming request data
        $request->merge(['library_id' =>    $curr_user->library_id]);

        $validatedData = $request->validate([
            'ISBN' => 'required|string|max:10',
            'numOfPages' => 'required|integer',
            'year_published' => 'required|integer',
            'format' => 'required|string|max:255',
            'price' => 'required|integer',
            'status' => 'required',
            'location' => 'required',
            'book_id' => 'required',
            'library_id' => 'required'
        ]);
        // return $validatedData;
        // Create a new Bookcopy instance with the validated data
        $bookcopy = Bookcopy::create($validatedData);

        // Return a JSON response with success message and the newly created bookcopy
        return response()->json(['message' => 'Library inserted successfully', 'bookcopy' => $bookcopy]);
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
