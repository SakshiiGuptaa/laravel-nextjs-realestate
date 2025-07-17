<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DealerWebsiteController;
use App\Http\Controllers\PublicSubdomainController;
use App\Http\Controllers\SocietyController;
use App\Http\Controllers\PropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post("register", [AuthController::class, "register"]);
Route::post("login", [AuthController::class, "login"]);

// Admin routes
Route::post('/admin/login', [AdminController::class, 'login']);
Route::put('/admin/update', [AdminController::class, 'update']);

Route::group([
    "middleware" => ["auth:sanctum"]
], function(){
    Route::get("profile",[AuthController::class, "profile"]);
    Route::get("logout",[AuthController::class, "logout"]);

});
Route::apiResource("properties", PropertyController::class); // ✅ Add this line    
Route::post('/properties/filter',[PropertyController::class,'filter']);
Route::apiResource("societies", SocietyController::class); // ✅ Add this line    

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Dealer Website CRUD
Route::get('/dealer/websites', [DealerWebsiteController::class, 'index']);
Route::post('/dealer/websites', [DealerWebsiteController::class, 'store']);
Route::get('/dealer/websites/{id}', [DealerWebsiteController::class, 'show']);
Route::delete('/dealer/websites/{id}', [DealerWebsiteController::class, 'destroy']);
Route::post('/dealer/websites/logo-upload', [DealerWebsiteController::class, 'uploadLogo']);

// Dealer property management routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('dealer')->group(function () {
        Route::get('/properties', [PropertyController::class, 'dealerIndex']);
        Route::post('/properties', [PropertyController::class, 'dealerStore']);
        Route::get('/properties/{property}', [PropertyController::class, 'dealerShow']);
        Route::put('/properties/{property}', [PropertyController::class, 'dealerUpdate']);
        Route::delete('/properties/{property}', [PropertyController::class, 'dealerDestroy']);
    });
});

// Public route for subdomain access
Route::get('/dealer-site/{subdomain}', [PublicSubdomainController::class, 'show']);

// Keep public routes for browsing properties
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{property}', [PropertyController::class, 'show']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// temporary route to your routes/api.php
Route::post('/test-login', function () {
    $user = \App\Models\User::firstOrCreate([
        'email' => 'dealer@test.com'
    ], [
        'name' => 'Test Dealer',
        'password' => bcrypt('password123')
    ]);

    $token = $user->createToken('test-token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
});


// Temporary route to seed properties for testing
Route::post('/seed-properties', function () {
    $properties = [
        [
            'user_id' => 2,
            'listing_type' => 'Sell',
            'property_type' => 'Apartment',
            'sub_type' => '3 BHK Apartment',
            'city' => 'Delhi',
            'bedrooms' => '3',
            'bathrooms' => '2',
            'balconies' => '2',
            'area_type' => 'Built-up Area',
            'area_value' => '1200',
            'area_unit' => 'sq.ft.'
        ],
        [
            'user_id' => 2,
            'listing_type' => 'Rent',
            'property_type' => 'Villa',
            'sub_type' => '4 BHK Villa',
            'city' => 'Mumbai',
            'bedrooms' => '4',
            'bathrooms' => '3',
            'balconies' => '1',
            'area_type' => 'Super Built-up Area',
            'area_value' => '2000',
            'area_unit' => 'sq.ft.'
        ],
        [
            'user_id' => 2,
            'listing_type' => 'Sell',
            'property_type' => 'House',
            'sub_type' => '2 BHK House',
            'city' => 'Bangalore',
            'bedrooms' => '2',
            'bathrooms' => '1',
            'balconies' => '1',
            'area_type' => 'Carpet Area',
            'area_value' => '900',
            'area_unit' => 'sq.ft.'
        ]
    ];

    foreach ($properties as $property) {
        \App\Models\Property::create($property);
    }

    return response()->json(['message' => 'Properties seeded successfully', 'count' => count($properties)]);
});
