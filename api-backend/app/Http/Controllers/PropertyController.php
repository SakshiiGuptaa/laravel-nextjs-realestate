<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the properties (no auth).
     */
    public function index()
    {
        // $user_id = auth()->user()->id;

        // $properties = Property::where("user_id", $user_id)->get();
        $properties = Property::all(); // show all properties for now

        return response()->json([
            "status" => true,
            "properties" => $properties
        ]);
    }

    /**
     * Store a newly created property in storage (no auth).
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "listing_type" => "nullable|string",
            "property_type" => "nullable|string",
            "sub_type" => "nullable|string",
            "city" => "nullable|string",
            "bedrooms" => "nullable|string",
            "bathrooms" => "nullable|string",
            "balconies" => "nullable|string",
            "area_type" => "nullable|string",
            "area_value" => "nullable|string",
            "area_unit" => "nullable|string"
        ]);

        // $data["user_id"] = auth()->user()->id;

        Property::create($data);

        return response()->json([
            "status" => true,
            "message" => "Property submitted successfully"
        ]);
    }

    /**
     * Display the specified property.
     */
    public function show(Property $property)
    {
        return response()->json([
            "status" => true,
            "property" => $property
        ]);
    }

    /**
     * Update the specified property in storage.
     */
    public function update(Request $request, Property $property)
    {
        $data = $request->validate([
            "listing_type" => "nullable|string",
            "property_type" => "nullable|string",
            "sub_type" => "nullable|string",
            "city" => "nullable|string",
            "bedrooms" => "nullable|string",
            "bathrooms" => "nullable|string",
            "balconies" => "nullable|string",
            "area_type" => "nullable|string",
            "area_value" => "nullable|string",
            "area_unit" => "nullable|string",
            "amenities" => "nullable|array",
        ]);

        $property->update($data);

        return response()->json([
            "status" => true,
            "message" => "Property updated successfully"
        ]);
    }

    /**
     * Remove the specified property from storage.
     */
    public function destroy(Property $property)
    {
        $property->delete();

        return response()->json([
            "status" => true,
            "message" => "Property deleted successfully"
        ]);
    }
}
