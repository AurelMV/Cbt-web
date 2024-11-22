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
    public function index()
    {
        $inscripciones = DB::table('inscripcions')
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
        ->paginate(2);
    
    // Consultar los datos adicionales necesarios para el formulario o lista de selección
    $estudiantes = DB::table('estudiantes')->select('id', 'nombres', 'aPaterno', 'aMaterno')->get();
    $programaEstudio = DB::table('programa_estudios')->select('id', 'nombre_programa')->get();
    $ciclosInscripcion = DB::table('ciclos')->select('id', 'nombre')->get();
    $grupos = DB::table('grupos')->select('id', 'nombre')->paginate(10);


    
    // Retornar los datos a la vista con Inertia
    return Inertia::render('GestiondePagos', [
        'inscripciones' => $inscripciones,
        'estudiantes' => $estudiantes,
        'programaEstudio' => $programaEstudio,
        'ciclosInscripcion' => $ciclosInscripcion,
        'grupos' => $grupos,
    ]);
    
    }

public function listadoDePagos(){
    
      $pagos = Pago::with(['inscripcion.estudiante', 'inscripcion.programaEstudio', 'inscripcion.ciclo', 'inscripcion.grupo'])
      ->select('id', 'monto', 'fecha', 'medioPago', 'nroVoucher','idInscripcion')
      ->paginate(5);

  // Formatear el campo `estado_pago`
  $pagos->getCollection()->transform(function ($pago) {
      $pago->estado_pago = $pago->estado_pago == 1 ? 'Pagado' : 'Pendiente';  // Ajusta según tu lógica
      return $pago;
  });

  // Obtener los datos adicionales para el formulario
  

  return response()->json(
  
        $pagos, // O cualquier otro dato que estés pasando
 
    

   /* return response()->json([
        'pagos' => $pagos,*/
      
    );


 

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
