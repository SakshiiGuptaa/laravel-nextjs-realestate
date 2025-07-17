<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Society extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'sortOrder',
    ];

    public function photos()
    {
        return $this->hasMany(SocietyPhoto::class);
    }

    public function videos()
    {
        return $this->hasMany(SocietyVideo::class);
        
    }
}
