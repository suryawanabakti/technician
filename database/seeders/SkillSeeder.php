<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\Skill::factory(30)->create();
        Skill::create([
            'name' => 'Tukang keramik',
        ]);
        Skill::create([
            'name' => 'Tukang batu',
        ]);
        Skill::create([
            'name' => 'Tukang cat',
        ]);
        Skill::create([
            'name' => 'Tukang keramik',
        ]);
        Skill::create([
            'name' => 'Tukang marmer',
        ]);
        Skill::create([
            'name' => 'Tukang besi',
        ]);
    }
}
