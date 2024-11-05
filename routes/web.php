<?php

use App\Http\Controllers\CursoController;
use App\Http\Controllers\ProfileController;
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

Route::get('/cursos', [CursoController::class, 'index'])->name('cursos.index');

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
