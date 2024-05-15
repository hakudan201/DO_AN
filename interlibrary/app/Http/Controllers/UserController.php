<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $curr_user = auth()->user();
        if ($curr_user->role == 'librarian') {
            $users = User::where('id', '!=', $curr_user->id)
                ->where('library_id', $curr_user->library_id)
                ->where('role', 'user')
                ->latest()
                ->get();
            $lib_name = User::with('library')
                ->where('library_id', $curr_user->library_id)
                ->where('id', $curr_user->id)
                ->latest()
                ->first();

            return Inertia::render('Users/LibIndex', [
                'users' => $users,
                'lib_name' => $lib_name->library->name
            ]);
        } else if ($curr_user->role == 'admin') {
            $users = User::where('id', '!=', $curr_user->id)->get();
            return Inertia::render('Users/AdminIndex', [
                'users' => $users,
            ]);
        }
        // return $curr_user->role == 'user';
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
    public function show($user_id)
    {
        $user = User::find($user_id);
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
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
    public function update(Request $request, User $user): RedirectResponse
    {
        // Gate::authorize('update', $user);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id), // Ensure email is unique except for the current user
            ],
            'DOB' => 'required|date',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:10',
            'due_membership' => 'required',
            'role' => 'required'
        ]);
        $user->update($validated);
        return redirect()->route('users.show', ['user' => $user->id]);
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
