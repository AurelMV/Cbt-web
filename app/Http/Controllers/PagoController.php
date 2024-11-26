<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Pago;
use App\Http\Requests\StorePagoRequest;
use App\Http\Requests\UpdatePagoRequest;
use App\Models\Ciclo;
use App\Models\Estudiante;
use App\Models\Grupo;
use App\Models\ProgramaEstudio;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('inscripcions')
            ->join('estudiantes', 'inscripcions.idEstudiante', '=', 'estudiantes.id')
            ->join('programa_estudios', 'inscripcions.idprogramaestudios', '=', 'programa_estudios.id')
            ->join('ciclos', 'inscripcions.idciclo', '=', 'ciclos.id')
            ->join('grupos', 'inscripcions.idGrupos', '=', 'grupos.id')
            ->select(
                'inscripcions.id',
                'inscripcions.turno',
                'inscripcions.fechaInscripcion',
                DB::raw("CASE WHEN inscripcions.estadopago = 1 THEN 'Pagado' ELSE 'Deudor' END as estadopago"),
                'estudiantes.nombres as estudiante_nombres',
                'estudiantes.aPaterno',
                'estudiantes.aMaterno',
                'ciclos.nombre as ciclo_nombre',
                'programa_estudios.nombre_programa as programa_nombre',
                'grupos.nombre as grupo_nombre'
            );
    
            if ($request->has('nombre_estudiante') && $request->nombre_estudiante != '') {
                $query->where(function ($query) use ($request) {
                    $query->where('estudiantes.nombres', 'like', '%' . $request->nombre_estudiante . '%');
                       
                });
            }
        
            // Filtro por documento del estudiante (si tienes el campo en la tabla estudiantes)
            if ($request->has('documento_estudiante') && $request->documento_estudiante != '') {
                $query->where('estudiantes.nro_documento', 'like', '%' . $request->documento_estudiante . '%');
            }
    
        if ($request->has('ciclo')) {
            $query->where('ciclos.nombre', 'like', '%' . $request->ciclo . '%');
        }
    
        if ($request->has('estado_pago')) {
            $query->where('inscripcions.estadopago', $request->estado_pago);
        }
    
        // Paginar
        $inscripciones = $query->paginate(10);
    
        // Datos adicionales para filtros (si los necesitas en el frontend)
        $estudiantes = DB::table('estudiantes')->select('id', 'nombres', 'aPaterno', 'aMaterno')->get();
        $programaEstudio = DB::table('programa_estudios')->select('id', 'nombre_programa')->get();
        $ciclosInscripcion = DB::table('ciclos')->select('id', 'nombre')->get();
        $grupos = DB::table('grupos')->select('id', 'nombre')->get();
    
        // Retornar los datos con Inertia
       /* return Inertia::render('GestiondePagos', [
            'inscripciones' => $inscripciones,
            'estudiantes' => $estudiantes,
            'programaEstudio' => $programaEstudio,
            'ciclosInscripcion' => $ciclosInscripcion,
            'grupos' => $grupos,
        ]);*/
        return response()->json([
            'inscripciones' => $inscripciones,
            'estudiantes' => $estudiantes,
            'programaEstudio' => $programaEstudio,
            'ciclosInscripcion' => $ciclosInscripcion,
            'grupos' => $grupos,
        ]);
    }
    

    public function listadoDePagos(Request $request)
{
    // Obtener los filtros desde la solicitud
    $nombre = $request->input('nombre');
    $nroDocumento = $request->input('nroDocumento');

    // Construir la consulta
    $query = Pago::with(['inscripcion.estudiante', 'inscripcion.programaEstudio', 'inscripcion.ciclo', 'inscripcion.grupo'])
        ->select('id', 'monto', 'fecha', 'medioPago', 'nroVoucher','idInscripcion');
    
    // Filtrar por nombre del estudiante si se proporciona
    if ($nombre) {
        $query->whereHas('inscripcion.estudiante', function($q) use ($nombre) {
            $q->where('nombres', 'like', '%' . $nombre . '%');
        });
    }

    // Filtrar por número de documento si se proporciona
    if ($nroDocumento) {
        $query->whereHas('inscripcion.estudiante', function($q) use ($nroDocumento) {
            $q->where('nro_documento', 'like', '%' . $nroDocumento . '%');
        });
    }

    // Realizar la paginación
    $pagos = $query->paginate(5);

    // Formatear el campo `estado_pago`
    $pagos->getCollection()->transform(function ($pago) {
        $pago->estado_pago = $pago->estado_pago == 1 ? 'Pagado' : 'Pendiente';
        return $pago;
    });

    return response()->json($pagos);
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
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'monto' => 'required|regex:/^\d+$/', // Permite cadenas numéricas
            'medioPago' => 'required|string|max:20',
            'nroVoucher' => 'required|string|max:10',
            'idInscripcion' => 'required|regex:/^\d+$/|exists:inscripcions,id',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Eror de creacion de Estudiante ',
                'errors' => $validator->errors()
            ], 422);
        }

        $pago = Pago::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Estudiante creado :)',
            'data' => $pago
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $pago = Pago::select(  'fecha',
        'monto',
        'medioPago',
        'nroVoucher',
        'idInscripcion',)
        
        ->findOrFail($id);

        return response()->json([
            'status' => true,
            'message' => 'Estudiante localizado',
            'data' => $pago
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pago $pago)
    {
        //
    }


    public function editarPago(Request $request, $id)
    {
        $pago = Pago::findOrFail($id);

        // Validar los datos entrantes
        $request->validate([
            'monto' => 'required|numeric',
            'medioPago' => 'required|string',
            'nroVoucher' => 'required|string',
        ]);

        // Actualizar los datos del pago
        $pago->update([
            'monto' => $request->input('monto'),
            'medioPago' => $request->input('medioPago'),
            'nroVoucher' => $request->input('nroVoucher'),
        ]);

        return response()->json(['message' => 'Pago actualizado correctamente']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'idPagos' => 'required|string|max:20',
            'fecha' => 'required|date',
            'monto' => 'required|integer',
            'medioPago' => 'required|string|max:20',
            'nroVoucher' => 'required|string|max:10',
            'idInscripcion' => 'required|integer|exists:inscripcion,idInscripcion'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $pago = Pago::findOrFail($id);
        $pago->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Pago modificado successfully',
            'data' => $pago
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pago = Pago::findOrFail($id);
        $pago->delete();

        return response()->json([
            'status' => true,
            'message' => 'Pago Eliminado? successfully'
        ], 204);
    }
}
