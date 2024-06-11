<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\ClickDetail;
use App\Models\Skill;
use App\Models\Technicians;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'technician' => Technicians::where('user_id', auth()->id())->first() ?? null,
            "skills" => Skill::all(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {

        $request->user()->fill($request->validated());
        if ($request->photo) {
            @unlink("storage/" . auth()->user()->photo);
            $photo = $request->file('photo')->store('photos');
            User::where('id', auth()->id())->update([
                'photo' => $photo
            ]);
        }
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();
        if (auth()->user()->hasRole('technician')) {
            Technicians::where('user_id', auth()->id())->update([
                'skill_id' => $request->skill_id,
                'skill_description' => $request->skill_description
            ]);
        }
        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function resetPencarian()
    {
        ClickDetail::where('user_id', auth()->id())->update(['text' => '']);
        return back();
    }
}
