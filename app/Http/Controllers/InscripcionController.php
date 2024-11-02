<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\Inscripcion;
use Illuminate\Http\Request;
use App\Http\Requests\StoreInscripcionRequest;
use App\Http\Requests\UpdateInscripcionRequest;

class InscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inscripcion = Inscripcion::all();
        return response()->json([
            'status' => true,
            'message' => 'Pagos Establecidos con exito :)',
            'data' => $inscripcion
        ], 200);
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
    public function show(Inscripcion $inscripcion)
    {
        //
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
