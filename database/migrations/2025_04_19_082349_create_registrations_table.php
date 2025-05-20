<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('person_data_id')->nullable()->constrained('person_data')->onUpdate('cascade')->onDelete('set null');
            $table->enum('membership_type', ['veld', 'zaal', 'niet spelend', 'lid']);
            $table->boolean('has_knvb_affiliation')->default(false);
            $table->string('club_name')->nullable();
            $table->string('membership_end')->nullable();
            $table->string('knvb_relation_number')->nullable();
            $table->text('comments')->nullable();
            $table->enum('status', ['in afwachting', 'geaccepteerd', 'afgewezen'])->default('in afwachting');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
