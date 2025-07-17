<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocietyVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'society_id',
        'file_path',
    ];

    public function society()
    {
        return $this->belongsTo(Society::class);
    }
}
