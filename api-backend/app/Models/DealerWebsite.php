<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealerWebsite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'theme_id',
        'branding',
        'subdomain',
        'custom_domain',
        'use_custom_domain',
        'social_links',
        'is_active',
        'status'
    ];

    protected $casts = [
        'branding' => 'array',
        'social_links' => 'array',
        'use_custom_domain' => 'boolean',
        'is_active' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}