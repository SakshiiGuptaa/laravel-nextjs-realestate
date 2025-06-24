<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyAmenity extends Model
{
    protected $fillable = ['property_id', 'amenity'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}

