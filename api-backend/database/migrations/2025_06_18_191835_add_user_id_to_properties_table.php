<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('properties', function (Blueprint $table) {
        $table->unsignedBigInteger('user_id')->nullable()->after('id');

        // Add foreign key constraint
        $table->foreign('user_id')
              ->references('id')
              ->on('users')
              ->onDelete('cascade'); // or 'set null' if you want to retain properties after user is deleted
    });
}

public function down()
{
    Schema::table('properties', function (Blueprint $table) {
        // Drop foreign key first, then column
        $table->dropForeign(['user_id']);
        $table->dropColumn('user_id');
    });
}

};
