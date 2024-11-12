<?php

use App\Http\Controllers\Api\ColegioController;
use App\Http\Controllers\Api\DepartamentoController;
use App\Http\Controllers\Api\DistritoController;
use App\Http\Controllers\Api\ProvinciaController;
use App\Models\Distrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/Colegio',ColegioController::class);
Route::get('/Colegio/Consulta/{id}',[ColegioController::class,'Consulta']);
Route::apiResource('/Distrito',DistritoController::class);
Route::get('/Distrito/Consulta/{id}',[DistritoController::class,'Consulta']);
Route::apiResource('/Provincia',ProvinciaController::class);
Route::get('/Provincia/Consulta/{id}',[ProvinciaController::class,'Consulta']);
Route::apiResource('/Departamento',DepartamentoController::class);