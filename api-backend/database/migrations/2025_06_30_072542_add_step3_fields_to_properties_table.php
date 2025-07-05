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
        Schema::table('properties', function (Blueprint $table) {
            $table->unsignedInteger('total_floors')->after('area_unit')->nullable();
            $table->unsignedInteger('property_on_floor')->after('total_floors')->nullable();
            $table->string('availability_status', 50)->after('property_on_floor')->nullable();
            $table->string('ownership', 50)->after('availability_status')->nullable();
            $table->unsignedBigInteger('expected_price')->after('ownership')->nullable();
            $table->unsignedBigInteger('price_per_sqft')->after('expected_price')->nullable();
            $table->boolean('all_inclusive')->default(false)->after('price_per_sqft');
            $table->boolean('tax_excluded')->default(false)->after('all_inclusive');
            $table->boolean('price_negotiable')->default(false)->after('tax_excluded');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn([
                'total_floors',
                'property_on_floor',
                'availability_status',
                'ownership',
                'expected_price',
                'price_per_sqft',
                'all_inclusive',
                'tax_excluded',
                'price_negotiable'
            ]);
        });
    }
};
