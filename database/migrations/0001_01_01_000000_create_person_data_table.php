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
        Schema::create('person_data', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->enum('gender', ['man', 'vrouw', 'anders'])->nullable();
            $table->string('initials')->nullable();
            $table->string('firstname');
            $table->string('lastname');
            $table->date('date_of_birth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('house_number')->nullable();
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('iban')->nullable();
            $table->string('bank_account_holder')->nullable();
            $table->json('volunteer_roles')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('person_data');
    }
};
