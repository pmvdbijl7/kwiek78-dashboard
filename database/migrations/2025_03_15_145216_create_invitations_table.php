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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_data_id')->nullable()->constrained('person_data')->onUpdate('cascade')->onDelete('set null');
            $table->string('token')->unique()->nullable();
            $table->json('roles')->nullable();
            $table->enum('status', ['klaargezet', 'in afwachting', 'geaccepteerd', 'geannuleerd', 'verlopen', 'mislukt'])->default('in afwachting');
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
