<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Http\Requests\StoreInscripcionRequest;
use App\Http\Requests\UpdateInscripcionRequest;
use App\Models\Pago;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InscripcionController extends Controller
{
    public function index()
    {
        $pagos = Pago::all();    $inscripciones = DB::table('inscripcions')
        ->join('estudiantes', 'inscripcions.idEstudiante', '=', 'estudiantes.id')
        ->join('programa_estudios', 'inscripcions.idprogramaestudios', '=', 'programa_estudios.id')
        ->join('ciclos', 'inscripcions.idciclo', '=', 'ciclos.id')
        ->join('grupos', 'inscripcions.idGrupos', '=', 'grupos.id')
        ->select(
            'inscripcions.id',
            'inscripcions.turno',
            'inscripcions.fechaInscripcion',
            DB::raw("CASE WHEN inscripcions.estadopago = 1 THEN 'Pagado' ELSE 'Deudor' END as estadopago"),  // Transformar el valor de estadopago
            'estudiantes.nombres as estudiante_nombres',
            'ciclos.nombre as ciclo_nombre',
            'programa_estudios.nombre_programa as programa_nombre',
            'grupos.nombre as grupo_nombre'
        )
        ->paginate(10);

    // Consultar los datos adicionales necesarios para el formulario o lista de selección
    $estudiantes = DB::table('estudiantes')->select('id', 'nombres', 'aPaterno', 'aMaterno')->get();
    $programaEstudio = DB::table('programa_estudios')->select('id', 'nombre_programa')->get();
    $ciclosInscripcion = DB::table('ciclos')->select('id', 'nombre')->get();
    $grupos = DB::table('grupos')->select('id', 'nombre')->get();

    // Retornar los datos a la vista con Inertia
    return Inertia::render('GestionInscripciones', [
        'inscripciones' => $inscripciones,
        'estudiantes' => $estudiantes,
        'programaEstudio' => $programaEstudio,
        'ciclosInscripcion' => $ciclosInscripcion,
        'grupos' => $grupos,
        'pagos' => $pagos
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator =Validator::make($request->all(), [
            'turno' => 'required|string|max:40',
            'fechaInscripcion' => 'required|date',
            'estadopa' => 'required|boolean',
            'idEstudiante' => 'required|string|exists:estudiantes,idEstudiante',
            'idprogramaestudios' => 'required|integer|exists:programaestudios,idprogramaestudios',
            'idciclo' => 'required|integer|exists:cicloInscripcion,idciclo',
            'idGrupos' => 'required|integer|exists:grupos,idGrupos'
        ]);
        

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Eror de creacion de Estudiante ',
                'errors' => $validator->errors()
            ], 422);
        }

        $inscripcion = Inscripcion::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Estudiante creado :)',
            'data' => $inscripcion
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $inscripcion = Inscripcion::select('turno',
        'fechaInscripcion',
        'estadopa',
        'idEstudiante',
        'idprogramaestudios',
        'idciclo',
        'idGrupos',)
        
        ->findOrFail($id);

        return response()->json([
            'status' => true,
            'message' => 'Estudiante localizado',
            'data' => $inscripcion
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inscripcion $inscripcion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'turno' => 'required|string|max:40',
            'fechaInscripcion' => 'required|date',
            'estadopa' => 'required|boolean',
            'idEstudiante' => 'required|string|exists:estudiantes,idEstudiante',
            'idprogramaestudios' => 'required|integer|exists:programaestudios,idprogramaestudios',
            'idciclo' => 'required|integer|exists:cicloInscripcion,idciclo',
            'idGrupos' => 'required|integer|exists:grupos,idGrupos'
           
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error en actualizar Inscripcion',
                'errors' => $validator->errors()
            ], 422);
        }

        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Inscripcion Actualizado ',
            'data' => $inscripcion
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    { $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Inscripcion Eliminado ? '
        ], 204);
        
    }
}
