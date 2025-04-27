<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Invitation;
use App\Models\PersonData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Show the users overview page
     */
    public function index(Request $request): Response
    {
        // Retrieve all users
        $users = User::whereDoesntHave('roles', function ($query) {
            $query->where('name', 'Super Admin');
        })
            ->with(['roles', 'personData'])
            ->get()
            ->map(function ($user) {
                // Retrieve the last activity timestamp from the sessions table
                $lastActivity = \DB::table('sessions')
                    ->where('user_id', $user->id)
                    ->orderBy('last_activity', 'desc')
                    ->value('last_activity');

                // Convert the timestamp to ISO 8601 format and attach it to the user
                $user->last_activity = $lastActivity
                    ? \Carbon\Carbon::createFromTimestamp($lastActivity)->toISOString()
                    : null;

                return $user;
            });

        // Return the Inertia response
        return Inertia::render('users/users', [
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Show the user edit page
     */
    public function edit(User $user): Response
    {
        // Retrieve all roles
        $roles = Role::whereNot('name', 'Super Admin')->get();

        return Inertia::render('users/edit', [
            'user' => new UserResource($user->load('personData')),
            'userRoles' => $user->roles,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the user
     */
    public function update(Request $request, User $user)
    {
        // Validate the request
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
                Rule::unique(PersonData::class)->ignore($user->personData->email, 'email'),
            ],
            'roles' => 'required|array',
        ]);

        // Update the person data
        $user->personData->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
        ]);

        // Update the user
        $user->update([
            'slug' => $user->personData->slug,
            'email' => $request->email,
        ]);

        // Sync the roles
        $user->syncRoles($request->roles);

        return to_route('users.edit', $user->slug);
    }

    /**
     * Delete the user
     */
    public function destroy(User $user)
    {
        // Delete the user
        $user->delete();

        // Redirect to the users overview page
        return to_route('users.index');
    }
}
