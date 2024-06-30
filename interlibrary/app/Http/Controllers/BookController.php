<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\GenresBook;
use App\Models\Library;
use App\Models\Bookcopy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

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
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255|unique:books,title',
            'author' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'description' => 'required|string|max:25555',
        ]);

        $book = Book::create($validatedData);
        foreach ($request->genre as $genreId) {
            GenresBook::create([
                'book_id' => $book->id,
                'genre_id' => $genreId,
            ]);
        }
        return 'ok';
        // return redirect(route('books.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show($book_id)
    {
        $book = Book::with('genres')->where('id', $book_id)->first();
        return Inertia::render('Books/Edit', [
            'book' => $book,
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
    public function update(Request $request, Book $book)
    {
        // return $request;
        $validatedData = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('books')->ignore($book->id), // Assuming $book is the current record being updated
            ],
            'author' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'description' => 'required|string|max:25555',
        ]);
        $book->update($validatedData);
        // GenresBook::where('book_id', $book->id)->delete();
        // foreach ($request->genres as $genreId) {
        //     GenresBook::create([
        //         'book_id' => $book->id,
        //         'genre_id' => $genreId,
        //     ]);
        // }
        return redirect()->route('books.show', ['book' => $book->id]);
    }

    public function getAllBook()
    {
        // $curr_user = auth()->user();
        $books = Book::with('genres')->get();
        return [
            'books' => $books,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        // Gate::authorize('delete', $book);

        // $book = Book::findOrFail($book);

        $book->delete();
        GenresBook::where('book_id', $book->id)->delete();
        return 'ok';
        // return redirect()->route('books.index');
    }

    public function searchBook(Request $request, Book $book)
    {
        $name = $request->name;
        // $query = $request->input('query');
        // Perform book search logic based on $query
        $books = Book::where('title', 'like', "%$name%")->latest()->get();

        return Inertia::render('SearchBook/BookList', [
            'input' => $name,
            'books' => $books
        ]);
    }

    public function viewBook(Request $request, Book $book_id)
    {
        // return $request->id;
        $book = Book::with('genres')->where('id', $request->id)->first();
        $bookcopies = DB::table('bookCopies')
            ->where('book_id', $book->id)
            ->select('library_id', 'year_published', 'location', 'id', 'status')
            ->get();

        $bookcopiesArray = $bookcopies->map(function ($item) {
            return (array)$item;
        });

        // Group the data by library_id
        $groupedData = [];
        foreach ($bookcopiesArray as $item) {
            $libraryId = $item['library_id'];

            // Retrieve library name
            $library = Library::findOrFail($libraryId);
            $libraryName = $library->name;

            // Append library name to the item
            $item['library_name'] = $libraryName;
            $name = $item['library_name'];

            // Group the data by library_id
            if (!isset($groupedData[$name])) {
                $groupedData[$name] = [];
            }
            $groupedData[$name][] = $item;
        }
        // return $groupedData;

        return Inertia::render('SearchBook/BookInfo', [
            'book' => $book,
            'bookcopies' => $groupedData
        ]);
    }
}
