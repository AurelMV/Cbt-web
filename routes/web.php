<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CicloController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\DocenteCursoController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramaEstudioController;
use App\Http\Controllers\ReportesController;
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
    Route::get('/GestionPagos', [PagoController::class, 'index'])->name('pagos.index');
    Route::get('/Estudiantes', [EstudianteController::class, 'index'])->name('estudiantes.index');
    Route::get('/GestionIncripciones', [InscripcionController::class, 'index'])->name('gestInscripcion.index');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas para pruebas
Route::get('/cursos', [CursoController::class, 'index'])->name('cursos.index');
Route::post('/cursos', [CursoController::class, 'store'])->name('cursos.store');
Route::put('/cursos/{curso}', [CursoController::class, 'update'])->name('cursos.update');
Route::get('/reportes', [ReportesController::class, 'index'])->name('reportes.index');
Route::get('/ciclos', [CicloController::class, 'index'])->name('ciclos.index');
Route::get('/docentes', [DocenteController::class, 'index'])->name('docentes.index');
Route::post('/docentes', [DocenteController::class, 'store'])->name('docentes.store');

Route::put('/docentes/{docente}', [DocenteController::class, 'update'])->name('docentes.update');
//Route::get('/programasEstudio', [ProgramaEstudioController::class, 'index'])->name('programasEstudio.index');
Route::get('/grupos', [GrupoController::class, 'index'])->name('grupos.index');
Route::get('/docenteCursos', [DocenteCursoController::class, 'index'])->name('docenteCursos.index');
Route::post('/grupos', [GrupoController::class, 'store'])->name('grupos.store');
Route::get('/enrollment-data', [EnrollmentController::class, 'index'])->name('diagrama.index');
// Rutas accesibles para usuario con el rol admin
Route::group(['middleware' => ['auth', 'verified', 'role:admin']], function () {  
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
    Route::resource('ciclos', CicloController::class);
    Route::resource('cursos', CursoController::class);
    Route::resource('programasEstudio', ProgramaEstudioController::class);
});


// Rutas accesibles para usuarios con el rol trabajador
Route::group(['middleware' => ['auth', 'verified', 'role:empleado']], function () {
    Route::get('/empleado', [EmpleadoController::class, 'index'])->name('empleado');
});





//canvios que se estan asiendo en Inscripciones ... 
Route::post('/web/inscripciones', [InscripcionController::class, 'store']);


Route::put('/estudiantes/{id}', [EstudianteController::class, 'update'])->name('estudiantes.update');



Route::put('/inscripciones/{id}', [InscripcionController::class, 'update'])->name('inscripciones.update');




Route::get('/GestionPagos', [PagoController::class, 'index'])->name('pagos.index');

//Route::get('/gestion-pagos', [PagoController::class, 'listadoDePagos'])->name('pagos.listado');
Route::put('/GestionPagos/{id}', [PagoController::class, 'update']);


Route::get('/ListaInscripciones', [InscripcionController::class, 'listarInscripciones'])->name('inscripciones.listar');



//es para aser prueva de la inter que no funca 
Route::get('/gestion-pagos', [PagoController::class, 'listadoDePagos'])->name('pagos.listadoDePagos');

//Route::get('/pagos', [PagoController::class, 'listadoPagos']);


Route::put('/editar-pago/{id}', [PagoController::class, 'editarPago']);

require __DIR__.'/auth.php';



