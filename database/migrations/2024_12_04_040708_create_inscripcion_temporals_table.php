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
        Schema::create('inscripcion_temporals', function (Blueprint $table) {
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
            $table->binary('fotoDNI')->nullable();
            $table->date('fecha');
            $table->integer('monto');
            $table->string('medioPago', 20);
            $table->string('nroVoucher', 10);
            $table->binary('fotoVoucher')->nullable();
            $table->string("estado")->default('Pendiente');
            $table->unsignedBigInteger('idprogramaestudios');
            $table->unsignedBigInteger('idciclo');
            $table->timestamps();


            $table->foreign('idprogramaestudios')->references('id')->on('programa_estudios')->onDelete('cascade');
            $table->foreign('idciclo')->references('id')->on('ciclos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripocion_temporals');
    }
};
