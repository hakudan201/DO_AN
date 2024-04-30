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
