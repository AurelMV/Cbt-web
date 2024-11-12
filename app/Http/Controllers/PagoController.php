<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use App\Http\Requests\StorePagoRequest;
use App\Http\Requests\UpdatePagoRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function index()
    {
        $pago = Pago::select(
            'fecha',
            'monto',
            'medioPago',
            'nroVoucher',
            'idInscripcion'
        )->get();



        /*return response()->json([
            'status' => true,
            'message' => 'Pagos Establecidos con exito :)',
            'data' => $pago
        ], 200);*/
        return Inertia::render('GestiondePagos', [
            'ciclos' => $pago
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
