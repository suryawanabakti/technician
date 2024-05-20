<?php

namespace Database\Seeders;

use App\Models\TechnicianType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SkillSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
        ]);
    }
}
