<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\TechnicianResource;
use App\Models\Skill;
use App\Models\Technicians;
use App\Models\TechnicianSkill;
use App\Models\User;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    public function index(Request $request)
    {
        $technicians = Technicians::orderBy('updated_at', 'desc');
        if ($request->search) {
            $technicians->where('skill_description', 'LIKE', "%{$request->search}%");
        }

        return inertia("Admin/Technicians/Page", ["technicians" => TechnicianResource::collection($technicians->paginate(5)), "search" => $request->search ?? null]);
    }

    public function create()
    {
        $skills = Skill::all()->map(function ($skill) {
            return [
                "value" => $skill->id,
                "label" => $skill->name,
            ];
        });
        return inertia("Admin/Technicians/Create", [
            "skills" => $skills
        ]);
    }

    public function store(StoreUserRequest $request)
    {

        $data = $request->all();
        if ($request->photo) {
            $data["photo"] = $request->file("photo")->store("photos");
        }

        $user = User::create($data)->assignRole("technician");
        $technician = Technicians::create([
            'user_id' => $user->id,
        ]);

        if ($request->skills) {
            foreach ($request->skills as $skill) {

                TechnicianSkill::create([
                    'technician_id' => $technician->id,
                    'skill_id' => $skill["value"]
                ]);
            }
        }

        return redirect()->route('admin.technicians.index')->with("message", "Berhasil tambah tukang " . $user->name);
    }

    public function destroy(Technicians $technician)
    {
        User::where('id', $technician->user_id)->delete();
        return redirect()->route('admin.technicians.index')->with("message", "Berhasil hapus tukang");
    }
}
