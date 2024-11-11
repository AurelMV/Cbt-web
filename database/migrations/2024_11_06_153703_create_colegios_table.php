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
        Schema::create('colegios', function (Blueprint $table) {    
            $table->id();
            $table->string('nombrecolegio');
            $table->string('codModular');
            $table->string('modalidad');
            $table->string('gestion');
            $table->decimal('latitud', 10, 6);
            $table->decimal('longitud', 10, 6);
            $table->foreignId('Distrito_idDistrito')->constrained('distritos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('colegios');
    }
};
