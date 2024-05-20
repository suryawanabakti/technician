<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TechnicianSkill extends Model
{
    use HasFactory;
    public $with = ['skill'];
    protected $guarded = ['id'];
    protected $keyType = 'string';

    public $incrementing = false;

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = str()->uuid();
        });
    }

    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class);
    }
}
