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
        Schema::create('plants', function (Blueprint $table) {
            $table->id();
            $table->string('scientific_name', 255);
            $table->string('common_name', 255);
            $table->string('image')->default('default.jpg');
            $table->string('family', 255);
            $table->text('growth_conditions');
            $table->string('light_requirement', 100);
            $table->string('water_requirement', 100);
            $table->string('soil_requirement', 255);
            $table->float('soil_ph');
            $table->float('temperature_min');
            $table->float('temperature_max');
            $table->float('humidity_min');
            $table->float('humidity_max');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plants');
    }
};
