<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyPhoto extends Model
{
    protected $fillable = ['property_id', 'file_path'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
