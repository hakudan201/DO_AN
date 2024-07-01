<?php

namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class LibraryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $curr_user = auth()->user();
        $libraries = Library::all();
        return Inertia::render('Libraries/Index', [
            'libraries' => $libraries,
        ]);
        // return $libraries;
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:libraries,email',
            'phone' => 'required|string|max:10|unique:libraries,phone',
            'address' => 'required|string|max:255',
        ]);
        Library::create($validated);
        return 'ok';
    }

    /**
     * Display the specified resource.
     */
    public function show(Library $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Library $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Library $library)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:libraries,email',
            'phone' => 'required|string|max:10|unique:libraries,phone',
            'address' => 'required|string|max:255',
        ]);
        $library->update($validatedData);
        return response()->json(['message' => 'Library updated successfully', 'library' => $library]);
        // return redirect(route('chirps.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Library $library)
    {
        $library->delete();
        return 'ok';
    }
}
