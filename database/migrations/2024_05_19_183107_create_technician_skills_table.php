<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('technician_skills', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('technician_id')->references('id')->on('technicians')->cascadeOnDelete();
            $table->foreignUuid('skill_id')->references('id')->on('skills')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technician_skills');
    }
};
