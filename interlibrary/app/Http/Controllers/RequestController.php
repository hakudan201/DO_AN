<?php

namespace App\Http\Controllers;

use App\Models\Bookcopy;
use App\Models\Library;
use App\Models\User;
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
            $requests = BookRequest::where('lend_type', 'normal')->whereHas('bookCopy', function ($query) use ($library_id) {
                $query->where('library_id', $library_id);
            })->with(['user:id,name,email,phone',])->with('bookcopy.book:id,title,author')->get();
            $lib_name = User::with('library')
                ->where('library_id', $library_id)
                ->where('id', auth()->user()->id)
                ->latest()
                ->first();
            return Inertia::render('Requests/Index', [
                'requests' => $requests,
                'lib_name' => $lib_name->library->name
            ]);
        } else if ($curr_user->role == 'member') {
            $bookRequests = BookRequest::where('user_id', auth()->user()->id)->whereHas(
                'bookCopy'
            )->with(['bookcopy.book:id,title', 'lendLib:id,name',])->get();

            return Inertia::render('Requests/indexForUser', [
                'requests' => $bookRequests,
            ]);
        }
        // return $requests;
    }

    public function interlibIndex()
    {
        $library_id = auth()->user()->library_id;
        $lend_requests = BookRequest::where('lend_type', 'interlib')
            ->where('lend_lib', $library_id)
            ->with(['user:id,name,email,phone,library_id', 'lendLib:id,name', 'borrowLib:id,name', 'bookcopy.book:id,title,author'])->get();
        $borrow_requests = BookRequest::where('lend_type', 'interlib')
            ->where('borrow_lib', $library_id)
            ->with(['user:id,name,email,phone,library_id', 'lendLib:id,name', 'borrowLib:id,name', 'bookcopy.book:id,title,author'])->get();
        $requests = $lend_requests->merge($borrow_requests);
        $lib_name = User::with('library')
            ->where('library_id', $library_id)
            ->where('id', auth()->user()->id)
            ->latest()
            ->first();
        return Inertia::render('Requests/InterlibIndex', [
            'requests' => $requests,
            'lib_name' => $lib_name->library->name
        ]);
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
        return Inertia::render('Requests/NormalRequestInformation', [
            'book' => $book,
            'bookcopy' => $bookcopy,
            'user' => $user,
            'request' => $request,
        ]);
    }

    public function interlibShow(Request $request)
    {
        $curr_user_id = auth()->user()->library_id;
        $book = $request->book;
        $bookcopy = $request->bookcopy;
        $user = $request->user;
        $borrow_lib_name = $request->borrow_lib;
        $lend_lib_name = $request->lend_lib;
        $request = BookRequest::find($request->request_id);
        $borrow_lib = $request->borrow_lib;

        if ($borrow_lib == $curr_user_id) {
            return Inertia::render('Requests/BorrowInformation', [
                'book' => $book,
                'bookcopy' => $bookcopy,
                'user' => $user,
                'request' => $request,
                'borrow_lib' => $borrow_lib_name,
                'lend_lib' => $lend_lib_name
            ]);
        } else {
            return Inertia::render('Requests/LendInformation', [
                'book' => $book,
                'bookcopy' => $bookcopy,
                'request' => $request,
                'borrow_lib' => $borrow_lib_name,
                'lend_lib' => $lend_lib_name
            ]);
        }
    }

    public function updateStatus(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'id' => 'required|exists:requests,id', // Validate that 'id' exists in 'book_requests' table
            'newStatus' => 'required|string', // Validate 'newStatus' as a required string
        ]);

        // Find the BookRequest instance by ID
        $bookRequest = BookRequest::findOrFail($validatedData['id']);

        // Check if the new status is 'active'
        if ($validatedData['newStatus'] === 'active') {
            // Set checkout_date to now and due_date to 14 days from now
            $bookRequest->checkout_date = now();
            $bookRequest->due_date = now()->addDays(14);
        }

        // Check if the new status is 'completed'
        if ($validatedData['newStatus'] === 'completed') {
            // Set return_date to now
            $bookRequest->return_date = now();
        }

        // Update the 'status' field with the new status provided
        $bookRequest->status = $validatedData['newStatus'];

        // Save the changes to the database
        $bookRequest->save();
    }


    // public function getRequestsOfUser($userId)
    // {
    //     // Find the BookRequest instances by user_id
    //     $bookRequests = BookRequest::where('user_id', $userId)->whereHas(
    //         'bookCopy'
    //     )->with([
    //         'lendLib:id,name,phone',
    //         'bookcopy.book:id,title,author'
    //     ])->get();
    //     // dd($bookRequests);
    //     return 'ok';
    //     // return [
    //     //     'bookRequests' => $bookRequests
    //     // ];
    // }

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
