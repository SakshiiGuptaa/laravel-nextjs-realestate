<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyAmenity;
use App\Models\PropertyPhoto;
use App\Models\PropertyVideo;
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
        $property = Property::create([
            // 'user_id' => auth()->id(),
            'listing_type' => $request->listing_type,
            'property_type' => $request->property_type,
            'sub_type' => $request->sub_type,
            'city' => $request->city,
            'bedrooms' => $request->bedrooms,
            'bathrooms' => $request->bathrooms,
            'balconies' => $request->balconies,
            'area_type' => $request->area_type,
            'area_value' => $request->area_value,
            'area_unit' => $request->area_unit,
        ]);

        // Store Photos
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('property_photos', 'public');
                PropertyPhoto::create([
                    'property_id' => $property->id,
                    'file_path' => $path,
                ]);
            }
        }

        // Store Videos
        if ($request->hasFile('videos')) {
            foreach ($request->file('videos') as $video) {
                $path = $video->store('property_videos', 'public');
                PropertyVideo::create([
                    'property_id' => $property->id,
                    'file_path' => $path,
                ]);
            }
        }

        // Store Amenities
        if ($request->amenities && is_array($request->amenities)) {
            foreach ($request->amenities as $amenity) {
                PropertyAmenity::create([
                    'property_id' => $property->id,
                    'amenity' => $amenity,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Property created successfully',
            'data' => $property->load(['photos', 'videos', 'amenities']),
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
