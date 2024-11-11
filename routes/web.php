<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CicloController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramaEstudioController;
use App\Models\Ciclo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas para pruebas
Route::get('/cursos', [CursoController::class, 'index'])->name('cursos.index');
Route::post('/cursos', [CursoController::class, 'store'])->name('cursos.store');
Route::get('/ciclos', [CicloController::class, 'index'])->name('ciclos.index');
Route::get('/docentes', [DocenteController::class, 'index'])->name('docentes.index');
Route::get('/programasEstudio', [ProgramaEstudioController::class, 'index'])->name('programasEstudio.index');
Route::get('/grupos', [GrupoController::class, 'index'])->name('grupos.index');
Route::post('/grupos', [GrupoController::class, 'store'])->name('grupos.store');

// Rutas accesibles para usuario con el rol admin
Route::group(['middleware' => ['auth', 'verified', 'role:admin']], function () {  
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
    Route::resource('ciclos', CicloController::class);
});


// Rutas accesibles para usuarios con el rol trabajador
Route::group(['middleware' => ['auth', 'verified', 'role:empleado']], function () {
    Route::get('/empleado', [EmpleadoController::class, 'index'])->name('empleado');
});





require __DIR__.'/auth.php';
