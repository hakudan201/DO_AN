<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $curr_user = auth()->user();
        $users = User::where('library_id', $curr_user->library_id)
                  ->where('id', '!=', $curr_user->id) // Exclude current user's ID
                  ->latest()
                  ->get();
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
        // return User::where('library_id', $user->library_id)->get();
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
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
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
