<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('dealer_websites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('theme_id');
            $table->json('branding');
            $table->string('subdomain')->unique();
            $table->string('custom_domain')->nullable();
            $table->boolean('use_custom_domain')->default(false);
            $table->json('social_links')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('status')->default('draft'); // 'draft' or 'published'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dealer_websites');
    }
};