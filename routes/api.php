<?php

use App\Http\Controllers\Api\ColegioController;
use App\Http\Controllers\Api\DepartamentoController;
use App\Http\Controllers\Api\DistritoController;
use App\Http\Controllers\Api\ProvinciaController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\PagoController;
use App\Models\Distrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/Colegio',ColegioController::class);
Route::get('/Colegio/Consulta/{id}',[ColegioController::class,'Consulta']);
Route::get('/Colegio/Busqueda/{id}',[ColegioController::class,'BusquedaCodModular']);
Route::apiResource('/Distrito',DistritoController::class);
Route::get('/Distrito/Consulta/{id}',[DistritoController::class,'Consulta']);
Route::apiResource('/Provincia',ProvinciaController::class);
Route::apiResource('/Departamento',DepartamentoController::class);

Route::post('/registrar-inscripcion-pago', [InscripcionController::class, 'registrarInscripcionYpago']);

Route::get('/api/inscripcion/{id}', [InscripcionController::class, 'editarInscripcion']);
//registro de pagosa
Route::post('/registrar-pago', [PagoController::class, 'store'])->name('pago.store');


//Route::get('/api/listado-de-pagos', [PagoController::class, 'listadoDePagos']);





