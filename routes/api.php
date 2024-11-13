<?php

use App\Http\Controllers\Api\ColegioController;
use App\Http\Controllers\Api\DepartamentoController;
use App\Http\Controllers\Api\DistritoController;
use App\Http\Controllers\Api\ProvinciaController;
use App\Http\Controllers\InscripcionController;
use App\Models\Distrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/Colegio',ColegioController::class);
Route::apiResource('/Distrito',DistritoController::class);
Route::apiResource('/Provincia',ProvinciaController::class);
Route::apiResource('/Departamento',DepartamentoController::class);

Route::post('/registrar-inscripcion-pago', [InscripcionController::class, 'registrarInscripcionYpago']);


