<?php
use App\Models\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CicloController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\DocenteCursoController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\InscripcionTemporalController;
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
        'canStudentForm' => Route::has('StudentForm'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::resource('/StudentForm', InscripcionTemporalController::class);

Route::get('/dashboard', [InscripcionTemporalController::class, 'listInscripcionsTemp'])->middleware(['auth', 'verified'])->name('dashboard');
Route::post('/dashboard', [InscripcionTemporalController::class, 'approve'])->middleware(['auth', 'verified'])->name('inscripcion.approve');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/GestionPagos', [PagoController::class, 'index'])->name('pagos.index');
    Route::get('/Estudiantes', [EstudianteController::class, 'index'])->name('estudiantes.index');

    Route::get('/GestionIncripciones', [InscripcionController::class, 'index'])->name('gestInscripcion.index');
    Route::get('/PDFpagos', [PagoController::class, 'ListadoparPDF'])->name('getpago.index');
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
Route::post('/grupos', [GrupoController::class, 'store'])->name('grupos.store');
Route::get('/grupos/grupo/{id}', [ReportesController::class, 'Grupo']);
Route::get('/grupos/DATAGrupo/{idCiclo}/{idGrupo}', [ReportesController::class, 'DataGrupo']);
Route::get('/grupos/Programa', [ReportesController::class, 'Programa']);
Route::get('/grupos/DATAPrograma/{idCiclo}/{idPrograma}', [ReportesController::class, 'DataPrograma']);
Route::get('/grupos/ciclo/{id}', [ReportesController::class, 'BusCiclo']);
Route::put('/grupos/{grupo}', [GrupoController::class, 'update'])->name('grupos.update');
Route::get('/docenteCursos', [DocenteCursoController::class, 'index'])->name('docenteCursos.index');
Route::post('/docenteCursos', [DocenteCursoController::class, 'store'])->name('docenteCursos.store');
Route::put('/docenteCursos/{docenteCurso}', [DocenteCursoController::class, 'update'])->name('docenteCursos.update');
Route::get('/enrollment-data', [EnrollmentController::class, 'index'])->name('diagrama.index');
// Rutas accesibles para usuario con el rol admin
Route::group(['middleware' => ['auth', 'verified', 'role:admin']], function () {  
    Route::resource('ciclos', CicloController::class);
    Route::resource('users', UserController::class);
    //Route::resource('cursos', CursoController::class);
    Route::resource('programasEstudio', ProgramaEstudioController::class);
});


// Rutas accesibles para usuarios con el rol trabajador
Route::group(['middleware' => ['auth', 'verified', 'role:empleado']], function () {

});





//canvios que se estan asiendo en Inscripciones ... 
Route::post('/web/inscripciones', [InscripcionController::class, 'store']);


Route::put('/estudiantes/{id}', [EstudianteController::class, 'update'])->name('estudiantes.update');



Route::put('/inscripciones/{id}', [InscripcionController::class, 'update'])->name('inscripciones.update');




Route::get('/GestionPagos', [PagoController::class, 'index'])->name('pagos.index');

//Route::get('/gestion-pagos', [PagoController::class, 'listadoDePagos'])->name('pagos.listado');
Route::put('/GestionPagos/{id}', [PagoController::class, 'update']);




Route::post('/inscripciones/{id}/update', [InscripcionController::class, 'update'])->name('inscripciones.update');


//es para aser prueva de la inter que no funca 
Route::get('/gestion-pagos', [PagoController::class, 'listadoDePagos'])->name('pagos.listadoDePagos');

//Route::get('/pagos', [PagoController::class, 'listadoPagos']);


Route::put('/editar-pago/{id}', [PagoController::class, 'editarPago']);

Route::resource('inscripcion-temporals', InscripcionTemporalController::class)->withoutMiddleware('auth');

require __DIR__ . '/auth.php';
