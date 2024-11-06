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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('monto');
            $table->string('medioPago', 20);
            $table->string('nroVoucher', 10);
            $table->unsignedBigInteger('idInscripcion');
            $table->timestamps();

            // Foreign key
            $table->foreign('idInscripcion')->references('id')->on('inscripcions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
