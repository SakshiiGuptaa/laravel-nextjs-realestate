<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'listing_type',
        'property_type',
        'sub_type',
        'city',
        'bedrooms',
        'bathrooms',
        'balconies',
        'area_type',
        'area_value',
        'area_unit',
        'total_floors',
        'property_on_floor',
        'availability_status',
        'ownership',
        'expected_price',
        'price_per_sqft',
        'all_inclusive',
        'tax_excluded',
        'price_negotiable',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photos()
    {
        return $this->hasMany(PropertyPhoto::class);
    }

    public function videos()
    {
        return $this->hasMany(PropertyVideo::class);
    }

    public function amenities()
    {
        return $this->hasMany(PropertyAmenity::class);
    }
}
