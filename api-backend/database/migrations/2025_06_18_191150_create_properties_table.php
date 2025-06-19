<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
        $table->id();
        $table->string('listing_type')->nullable();     // Sell, Rent / Lease, PG
        $table->string('property_type')->nullable();    // Residential, Commercial
        $table->string('sub_type')->nullable();         // Flat, Villa, etc.
        $table->string('city')->nullable();             // Society / Location
        $table->string('bedrooms')->nullable();
        $table->string('bathrooms')->nullable();
        $table->string('balconies')->nullable();
        $table->string('area_type')->nullable();        // Carpet/Built-up/Super Built-up
        $table->string('area_value')->nullable();       // Numeric value as string
        $table->string('area_unit')->default('sq.ft');  // Unit of measurement
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
