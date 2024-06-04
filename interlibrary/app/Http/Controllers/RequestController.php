<?php

namespace App\Http\Controllers;

use App\Models\Bookcopy;
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
        $curr_user = auth()->user();
        if ($curr_user->role == 'librarian') {
            $library_id = auth()->user()->library_id;
            $requests = BookRequest::whereHas('bookCopy', function ($query) use ($library_id) {
                $query->where('library_id', $library_id);
            })->with(['user:id,name,email,phone',])->with('bookcopy.book:id,title,author')->get();
            return Inertia::render('Requests/Index', [
                'requests' => $requests,
            ]);
        } else if ($curr_user->role == 'member') {
            $bookRequests = BookRequest::where('user_id', auth()->user()->id)->whereHas(
                'bookCopy'
            )->with('bookcopy.book:id,title,author')->get();

            return Inertia::render('Requests/indexForUser', [
                'requests' => $bookRequests,
            ]);
        }
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
    public function store(Request $request)
    {
        $curr_user = auth()->user();
        $currentDateTime = now();
        $request->merge([
            'user_id' => $curr_user->id,
            'borrow_lib' => $curr_user->library_id,
            'borrow_date' => $currentDateTime,
            'lend_type' => ($curr_user->library_id == $request->input('lend_lib')) ? 'normal' : 'interlib',
            'status' => 'pending'
        ]);

        // return $request;


        $validated = $request->validate([
            'bookcopy_id' => 'required',
            'user_id' => 'required',
            'borrow_date' => 'required',
            'status' => 'required',
            'borrow_lib' => 'required',
            'lend_lib' => 'required',
            'lend_type' => 'required',
        ]);

        BookRequest::create($validated);
        Bookcopy::where('id', $request->bookcopy_id)->update(['status' => 'Reserved']);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $book = $request->book;
        $bookcopy = $request->bookcopy;
        $user = $request->user;
        $request = BookRequest::find($request->request_id);
        return Inertia::render('Requests/RequestInformation', [
            'book' => $book,
            'bookcopy' => $bookcopy,
            'user' => $user,
            'request' => $request,
        ]);
    }

    public function updateStatus(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:requests,id', // Validate that 'id' exists in 'book_requests' table
            'newStatus' => 'required|string', // Validate 'newStatus' as a required string
        ]);

        // Find the BookRequest instance by ID
        $bookRequest = BookRequest::findOrFail($validatedData['id']);

        // Update the 'status' field with the new status provided
        $bookRequest->update(['status' => $validatedData['newStatus']]);
    }

    public function getRequestsOfUser($userId)
    {
        // Find the BookRequest instances by user_id
        $bookRequests = BookRequest::where('user_id', $userId)->whereHas(
            'bookCopy'
        )->with('bookcopy.book:id,title,author')->get();

        return [
            'bookRequests' => $bookRequests
        ];
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
