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
        Schema::create('inscripcions', function (Blueprint $table) {
            $table->id();
            $table->string('turno', 40);
            $table->timestamp('fechaInscripcion');
            $table->boolean('estadopago');
            $table->unsignedBigInteger('idEstudiante');
            $table->unsignedBigInteger('idprogramaestudios');
            $table->unsignedBigInteger('idusuarios');
            $table->unsignedBigInteger('idciclo');
            $table->unsignedBigInteger('idGrupos');
            $table->timestamps();

            // Foreign keys
            $table->foreign('idEstudiante')->references('id')->on('estudiantes')->onDelete('cascade');
            $table->foreign('idprogramaestudios')->references('id')->on('programa_estudios')->onDelete('cascade');
            $table->foreign('idusuarios')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idciclo')->references('id')->on('ciclos')->onDelete('cascade');
            $table->foreign('idGrupos')->references('id')->on('grupos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripcions');
    }
};
