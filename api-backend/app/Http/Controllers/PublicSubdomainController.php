<?php

namespace App\Http\Controllers;

use App\Models\DealerWebsite;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;

class PublicSubdomainController extends Controller
{
    public function show($subdomain)
    {
        // Find the dealer website by subdomain
        $website = DealerWebsite::where('subdomain', $subdomain)
            ->where('is_active', true)
            ->first();

        if (!$website) {
            return response()->json([
                'status' => false,
                'message' => 'Website not found'
            ], 404);
        }

        // Get the dealer/user information
        $dealer = User::find($website->user_id);
        
        if (!$dealer) {
            return response()->json([
                'status' => false,
                'message' => 'Dealer not found'
            ], 404);
        }

        // Get the dealer's properties
        $properties = Property::where('user_id', $dealer->id)
            ->get();

        return response()->json([
            'status' => true,
            'website' => $website,
            'dealer' => [
                'id' => $dealer->id,
                'name' => $dealer->name,
                'email' => $dealer->email,
            ],
            'properties' => $properties
        ]);
    }
}