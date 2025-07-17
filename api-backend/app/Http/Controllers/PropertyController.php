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
        $properties = Property::with(['photos', 'videos', 'amenities'])->get();

        $mapped = $properties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->sub_type,
                'property_type' => $property->property_type,
                'listing_type' => $property->listing_type,
                'price' => '₹' . number_format($property->area_value),
                'area' => $property->area_value,
                'price2' => 'Price on Request',
                'location' => $property->city,
                'bhk' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'balconies' => $property->balconies,
                'area_type' => $property->area_type,
                'description' => "{$property->property_type} - {$property->listing_type}",
                'builder' => 'Default Builder',
                'phoneNumber' => '9876543210',
                'isRera' => true,
                'isZeroBrokerage' => true,
                'is3D' => false,
                'isNewBooking' => false,
                'images' => $property->photos->map(function ($photo) {
                    return asset("storage/" . $photo->file_path);
                }),

                'videos' => $property->videos->pluck('file_path'),
                'amenities' => $property->amenities->pluck('amenity'),
            ];
        });


        return response()->json([
            'status' => true,
            'properties' => $mapped,
        ]);
    }

    /**
     * Display a listing of the properties with filter(no auth). Post
     */
    public function filter(Request $request){
        $query = Property::query();

        if($request->filled('city')){
            $query->where('city',$request->city);
        }
        if($request->filled('property_type')){
            $query->where('property_type',$request->property_type);
        }
        if($request->filled('bhk')){
            $query->where('bedrooms',$request->bhk);
        }
        if($request->filled('sub_type')){
            $query->where('sub_type',$request->sub_type);
        }

        $properties = $query->with(['photos', 'videos', 'amenities'])->get();

        $mapped = $properties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->sub_type,
                'property_type' => $property->property_type,
                'sub_type' => $property->sub_type,
                'price' => '₹' . number_format($property->area_value),
                'area' => $property->area_value,
                'price2' => 'Price on Request',
                'location' => $property->city,
                'bhk' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'balconies' => $property->balconies,
                'area_type' => $property->area_type,
                'description' => "{$property->property_type} - {$property->listing_type}",
                'builder' => 'Default Builder',
                'phoneNumber' => '9876543210',
                'isRera' => true,
                'isZeroBrokerage' => true,
                'is3D' => false,
                'isNewBooking' => false,
                'images' => $property->photos->map(function ($photo) {
                    return asset("storage/" . $photo->file_path);
                }),

                'videos' => $property->videos->pluck('file_path'),
                'amenities' => $property->amenities->pluck('amenity'),
            ];
        });


        return response()->json([
            'status' => true,
            'properties' => $mapped,
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
            
            // 👉 New Step 3 fields
            'total_floors' => $request->total_floors,
            'property_on_floor' => $request->property_on_floor,
            'availability_status' => $request->availability_status,
            'ownership' => $request->ownership,
            'expected_price' => $request->expected_price,
            'price_per_sqft' => $request->price_per_sqft,
            'all_inclusive' => $request->has('all_inclusive') ? true : false,
            'tax_excluded' => $request->has('tax_excluded') ? true : false,
            'price_negotiable' => $request->has('price_negotiable') ? true : false,
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
        $property->load(['photos', 'videos', 'amenities']);

        $mapped = [
            'id' => (string) $property->id,
            'title' => $property->sub_type ?? '',
            'price' => '₹' . number_format($property->area_value ?? 0),
            'pricePerSqft' => '₹9,548 per sq.ft.', // Placeholder — adjust if needed
            'bhk' => (int) $property->bedrooms,
            'baths' => (int) $property->bathrooms,
            'area' => (int) $property->area_value,
            'areaUnit' => $property->area_unit ?? 'sq.ft.',

            'reraStatus' => [
                'isRegistered' => true, // Adjust if dynamic
                'registrationNo' => 'UPRERAPRJ958386',
                'website' => 'http://up-rera.in/projects',
            ],

            'isReadyToMove' => true, // Or pull from DB

            'images' => $property->photos->map(function ($photo) {
                return asset("storage/" . $photo->file_path);
            }),

            'configuration' => [
                'bedrooms' => (int) $property->bedrooms,
                'bathrooms' => (int) $property->bathrooms,
                'balconies' => (int) $property->balconies,
                'floor' => 15,
                'totalFloors' => 23,
                'propertyAge' => '0 to 1 Year Old',
            ],

            'address' => [
                'society' => 'Coco County',
                'locality' => 'Sector 10 Greater Noida West',
                'city' => $property->city ?? '',
                'state' => 'UP',
            ],

            'society' => [
                'name' => 'Coco County',
                'area' => 4.54,
                'areaUnit' => 'acres',
                'towers' => 3,
                'units' => 838,
                'floors' => 23,
                'configuration' => '3 BHK',
                'propertyType' => $property->property_type ?? '',
                'brochureUrl' => '#',
                'developer' => 'ABA Corp',
                'possession' => '2023',
            ],

            'amenities' => $property->amenities->pluck('amenity'),

            'nearbyPlaces' => [
                ['name' => 'Gaur City Mall', 'type' => 'Mall'],
                ['name' => 'GT Road', 'type' => 'Road'],
                ['name' => 'The Infinity School', 'type' => 'School'],
                ['name' => 'JIMS Noida Extension College', 'type' => 'College'],
                ['name' => 'Numed Super Speciality Hospital', 'type' => 'Hospital'],
            ],

            'whyConsider' => [
                'Close to School',
                'Fresh Construction',
                'Close to Hospital',
                'Close to Market',
                'Wheel Chair Friendly',
                'Pet Friendly',
                'On-Call Maintenance Staff',
                'Gated Society',
                'Corner Property',
                'Airy Rooms',
                'Parking Available',
                'Fitness Centre/ Gym',
                'Club/ Community Center',
                'Swimming Pool Available',
            ],

            'transactionDetails' => [
                'transactionType' => 'Resale',
                'propertyOwnership' => 'Co-operative Society',
                'furnishing' => 'Unfurnished',
                'parking' => '1 Covered',
                'gatedCommunity' => true,
                'petFriendly' => true,
                'wheelchairFriendly' => true,
                'powerBackup' => 'None',
                'cornerProperty' => true,
            ],

            'about' => [
                'address' => 'A 1510, Sector 10 Greater Noida West, Greater Noida',
                'description' => 'County group is well known for its quality. Flat is brand new. Is hardly a year old. All the top notch amenities are available.',
            ],

            'features' => [
                'Power Back-up',
                'Intercom Facility',
                'Lift(s)',
                'Water purifier',
                'Maintenance Staff',
                'Swimming Pool',
                'Park',
                'Security Personnel',
                'Airy Rooms',
                'Shopping Centre',
            ],

            'owner' => [
                'name' => 'Sandhya',
                'avatar' => '',
                'phoneNumber' => '9876543210',
                'propertiesListed' => 1,
                'localities' => ['Sector 10 Greater Noida West'],
            ],
        ];

        return response()->json([
            "status" => true,
            "property" => $mapped
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
   /**
     * Get properties for the authenticated dealer
     */
    public function dealerIndex(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $properties = Property::where('user_id', $user->id)->get();

        // Transform the data to match the expected format
        $transformedProperties = $properties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $this->generateTitle($property),
                'description' => $this->generateDescription($property),
                'type' => $property->property_type ?? 'Residential',
                'price' => $this->generatePrice($property),
                'bedrooms' => $property->bedrooms ?? 'N/A',
                'bathrooms' => $property->bathrooms ?? 'N/A',
                'area' => $property->area_value ?? 'N/A',
                'location' => $property->city ?? 'Location not specified',
                'images' => [], // Will be empty for now
                'status' => 'active',
                'created_at' => $property->created_at,
                'updated_at' => $property->updated_at
            ];
        });

        return response()->json([
            'status' => true,
            'properties' => $transformedProperties
        ]);
    }

    /**
     * Generate a title for the property
     */
    private function generateTitle($property)
    {
        $title = '';
        
        if ($property->sub_type) {
            $title = $property->sub_type;
        } elseif ($property->property_type) {
            $title = $property->property_type;
        } else {
            $title = 'Property';
        }
        
        if ($property->city) {
            $title .= ' in ' . $property->city;
        }
        
        return $title;
    }

    /**
     * Generate a description for the property
     */
    private function generateDescription($property)
    {
        $description = '';
        
        if ($property->listing_type) {
            $description = 'Available for ' . $property->listing_type . '. ';
        }
        
        if ($property->bedrooms && $property->bathrooms) {
            $description .= $property->bedrooms . ' bedrooms, ' . $property->bathrooms . ' bathrooms. ';
        }
        
        if ($property->area_value && $property->area_unit) {
            $description .= $property->area_value . ' ' . $property->area_unit . ' ' . ($property->area_type ?? 'area') . '.';
        }
        
        return $description ?: 'Property details available on request.';
    }

    /**
     * Generate a price for the property (placeholder)
     */
    private function generatePrice($property)
    {
        // Since there's no price field in your table, we'll generate a placeholder
        // You might want to add a price field to your properties table
        
        if ($property->listing_type === 'Rent') {
            // Generate rent based on area (rough estimate)
            $baseRent = ($property->area_value ?? 1000) * 0.5;
            return (int)$baseRent;
        } else {
            // Generate sale price based on area (rough estimate)
            $basePrice = ($property->area_value ?? 1000) * 50;
            return (int)$basePrice;
        }
    }

    /**
     * Store a new property for the authenticated dealer
     */
    public function dealerStore(Request $request)
    {
        $validated = $request->validate([
            'listing_type' => 'required|string',
            'property_type' => 'required|string',
            'sub_type' => 'nullable|string',
            'city' => 'required|string',
            'bedrooms' => 'nullable|string',
            'bathrooms' => 'nullable|string',
            'balconies' => 'nullable|string',
            'area_type' => 'nullable|string',
            'area_value' => 'nullable|string',
            'area_unit' => 'nullable|string',
        ]);

        $property = Property::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Property created successfully',
            'property' => $property,
        ], 201);
    }

    /**
     * Delete a property for the authenticated dealer
     */
    public function dealerDestroy(Request $request, Property $property)
    {
        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $property->delete();

        return response()->json([
            'status' => true,
            'message' => 'Property deleted successfully'
        ]);
    }

    /**
     * Show a specific property for the authenticated dealer
     */
    public function dealerShow(Request $request, Property $property)
    {
        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'status' => true,
            'property' => $property
        ]);
    }

    /**
     * Update a property for the authenticated dealer
     */
    public function dealerUpdate(Request $request, Property $property)
    {
        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validated = $request->validate([
            'listing_type' => 'required|string',
            'property_type' => 'required|string',
            'sub_type' => 'required|string',
            'city' => 'required|string',
            'bedrooms' => 'required|string',
            'bathrooms' => 'required|string',
            'balconies' => 'required|string',
            'area_type' => 'required|string',
            'area_value' => 'required|string',
            'area_unit' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $property->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Property updated successfully',
            'property' => $property
        ]);
    }
}
