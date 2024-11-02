<?php

use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\PagoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
  //  return $request->user();
//})->middleware('auth:sanctum');


    Route::apiResource('estudiantes', EstudianteController::class);
    Route::apiResource('inscripciones', InscripcionController::class);
    Route::apiResource('pagos', PagoController::class);
   // Route::post('estudiantes', [EstudianteController::class, 'store']);

