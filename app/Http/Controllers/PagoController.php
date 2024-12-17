<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Pago;
use App\Http\Requests\StorePagoRequest;
use App\Http\Requests\UpdatePagoRequest;
use App\Models\Ciclo;
use App\Models\Estudiante;
use App\Models\Grupo;
use App\Models\Inscripcion;
use App\Models\ProgramaEstudio;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function index()
    {
        $inscripcion = Inscripcion::with(['estudiante', 'programaEstudio', 'ciclo', 'grupo'])->paginate(15);

        //return response()->json(

        //   $inscripcion, 

        //);
        $query = Inscripcion::with(['estudiante', 'programaEstudio', 'ciclo', 'grupo']);

        // Verificar si se pasó un parámetro de búsqueda por nombre del estudiante
        if (request()->has('name') && !empty(request('name'))) {
            $query->whereHas('estudiante', function ($subQuery) {
                $subQuery->where('nombres', 'like', '%' . request('name') . '%');
            });
        }
        if (request()->has('documento') && !empty(request('documento'))) {
            $query->whereHas('estudiante', function ($subQuery) {
                $subQuery->where('Nrodocumento', 'like', '%' . request('documento') . '%');
            });
        }

 
        // Paginar los resultados
        $inscripcion = $query->paginate(15);
        return Inertia::render('GestiondePagos', [
            'inscripciones' => $inscripcion,
            'queryParams' => request()->query(),
        ]);

        // Retornar los datos con Inertia

        /*return response()->json([
            'inscripciones' => $inscripciones,
            'estudiantes' => $estudiantes,
            'programaEstudio' => $programaEstudio,
            'ciclosInscripcion' => $ciclosInscripcion,
            'grupos' => $grupos,
        ]);*/
    }


    public function listadoDePagos(Request $request)
    {
        // Obtener los filtros desde la solicitud
        $nombre = $request->input('nombre');
        $nroDocumento = $request->input('nroDocumento');

        // Construir la consulta
        $query = Pago::with(['inscripcion.estudiante', 'inscripcion.programaEstudio', 'inscripcion.ciclo', 'inscripcion.grupo'])
            ->select('id', 'monto', 'fecha', 'medioPago', 'nroVoucher', 'idInscripcion');

        // Filtrar por nombre del estudiante si se proporciona
        if ($nombre) {
            $query->whereHas('inscripcion.estudiante', function ($q) use ($nombre) {
                $q->where('nombres', 'like', '%' . $nombre . '%');
            });
        }

        // Filtrar por número de documento si se proporciona
        if ($nroDocumento) {
            $query->whereHas('inscripcion.estudiante', function ($q) use ($nroDocumento) {
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

    public function ListadoparPDF(Request $request)
    {
        // Obtener los filtros desde la solicitud
        $nombre = $request->input('nombre');
        $nroDocumento = $request->input('nroDocumento');
        $ciclo = $request->input('ciclo');
        $grupo = $request->input('grupo');
    
        // Construir la consulta con las relaciones necesarias
        $query = Pago::with([
            'inscripcion.estudiante', 
            'inscripcion.programaEstudio', 
            'inscripcion.ciclo', 
            'inscripcion.grupo'
        ])
        ->select('id', 'monto', 'fecha', 'medioPago', 'nroVoucher', 'idInscripcion');
    
        // Filtrar por nombre del estudiante si se proporciona
        if ($nombre) {
            $query->whereHas('inscripcion.estudiante', function ($q) use ($nombre) {
                $q->where('nombres', 'like', '%' . $nombre . '%');
            });
        }
    
        // Filtrar por número de documento si se proporciona
        if ($nroDocumento) {
            $query->whereHas('inscripcion.estudiante', function ($q) use ($nroDocumento) {
                $q->where('nro_documento', 'like', '%' . $nroDocumento . '%');
            });
        }
    
        // Filtrar por ciclo si se proporciona
        if ($ciclo) {
            $query->whereHas('inscripcion.ciclo', function ($q) use ($ciclo) {
                $q->where('nombre', 'like', '%' . $ciclo . '%');
            });
        }
    
        // Filtrar por grupo si se proporciona
        if ($grupo) {
            $query->whereHas('inscripcion.grupo', function ($q) use ($grupo) {
                $q->where('nombre', 'like', '%' . $grupo . '%');
            });
        }
    
        // Realizar la paginación
        $pagos = $query->paginate(15);
    
        // Devolver los resultados en formato JSON (o como desees)
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
        $pago = Pago::select(
            'fecha',
            'monto',
            'medioPago',
            'nroVoucher',
            'idInscripcion',
        )

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
