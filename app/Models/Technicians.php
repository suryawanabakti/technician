<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Technicians extends Model
{
    use HasFactory;
    public $with = ['user', 'skills', 'skill'];
    protected $guarded = ['id'];
    protected $keyType = 'string';

    public $incrementing = false;

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = str()->uuid();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(TechnicianSkill::class, 'technician_id', 'id');
    }
}
