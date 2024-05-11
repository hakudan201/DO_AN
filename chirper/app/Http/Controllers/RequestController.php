<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Request as BookRequest;


class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $library_id = auth()->user()->library_id;
        $requests = BookRequest::whereHas('bookCopy', function ($query) use ($library_id) {
            $query->where('library_id', $library_id);
        })->with(['user:id,name,email,phone', ])->with('bookcopy.book:id,title,author')->get();
        return Inertia::render('Requests/Index', [
            'requests' => $requests,
        ]);
        // return $requests;
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
    public function show(Request $request)
    {
        return $request;
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
    // public function update(Request $request, Book $book)
    // {
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'author' => 'required|string|max:255',
    //         'publisher' => 'required|string|max:255',
    //         'description' => 'required|string|max:25555',
    //     ]);
    //     $book->update($validatedData);
    //     return response()->json(['message' => 'Library updated successfully', 'book' => $book]);
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
