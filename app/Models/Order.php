<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $with = ['technician', 'user'];

    public $incrementing = false;

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = str()->uuid();
        });
    }

    public function technician()
    {
        return $this->belongsTo(Technicians::class, 'technician_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
