<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\Technicians;
use App\Models\TechnicianSkill;
use App\Models\TechnicianType;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory(500)->create()->map(fn ($user) => $user->assignRole("user"));

        \App\Models\User::factory(41)->create()->map(function ($user) {
            $user->assignRole("technician");
            $technician = Technicians::create([
                'user_id' => $user->id,
                'skill_description' => fake()->text(),
                'skill_id' => Skill::all()->random()->id
            ]);

            // $random = rand(1, 7);
            // for ($i = 0; $i < $random; $i++) {
            //     $randomSkillId = Skill::all()->random()->id;
            //     $transactionSkill = TechnicianSkill::where('technician_id', $technician->id)->where('skill_id', $randomSkillId)->first();
            //     if (empty($transactionSkill)) {
            //         TechnicianSkill::create([
            //             'technician_id' => $technician->id,
            //             'skill_id' => $randomSkillId
            //         ]);
            //     }
            // }
        });

        \App\Models\User::create(["name" => "Admin", "email" => "admin@admin", "password" => bcrypt("qwerty123")])->assignRole("admin");
    }
}
