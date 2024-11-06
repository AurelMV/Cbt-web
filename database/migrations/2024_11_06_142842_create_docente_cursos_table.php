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
        Schema::create('docente_cursos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idDocente')->constrained('docentes');
            $table->foreignId('idCurso')->constrained('cursos');
            $table->foreignId('idGrupo')->constrained('grupos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('docente_cursos');
    }
};
