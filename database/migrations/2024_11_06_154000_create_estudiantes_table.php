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
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombres', 80);
            $table->string('aPaterno', 120);
            $table->string('aMaterno', 120);
            $table->char('sexo', 1);
            $table->string('celularestudiante', 9);
            $table->string('celularapoderado', 9);
            $table->date('fechaNacimiento')->nullable();
            $table->string('email', 220)->unique();
            $table->string('anoculminado', 45);
            $table->string('Nrodocumento', 45)->nullable();
            $table->string('tipodocumento', 45)->nullable();
            $table->string('direccion', 45);
            $table->binary('foto')->nullable();
            $table->unsignedBigInteger('idcolegios');
            $table->timestamps();

            // Foreign key
            $table->foreign('idcolegios')->references('id')->on('colegios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudiantes');
    }
};
