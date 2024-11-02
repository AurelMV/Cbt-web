<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Http\Requests\StoreEstudianteRequest;
use App\Http\Requests\UpdateEstudianteRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estudiante = Estudiante::all();
        return response()->json([
            'status' => true,
            'message' => 'Estudiantes Establecidos con exito :)',
            'data' => $estudiante
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
            'idEstudiante'=>'required|string|max:80',
            'nombres' => 'required|string|max:80',
        'aPaterno' => 'required|string|max:120',
        'aMaterno' => 'required|string|max:120',
        'sexo' => 'required|string|max:1',
        'celularestudiante' => 'required|string|max:9',
        'celularapoderado' => 'required|string|max:9',
        'fechaNacimiento' => 'nullable|date',
        'email' => 'required|email|max:220',
        'anoculminado' => 'required|string|max:45',
        'Nrodocumento' => 'nullable|string|max:45',
        'tipodocumento' => 'nullable|string|max:45',
        'direccion' => 'required|string|max:45',
        'foto' => 'nullable|image|max:2048', // Cambia a 'image' si esperas una imagen
       
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Eror de creacion de Estudiante ',
                'errors' => $validator->errors()
            ], 422);
        }

        $estudiante = Estudiante::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Estudiante creado :)',
            'data' => $estudiante
        ], 201);
    
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $estudiante = Estudiante::findOrFail($id);
        return response()->json([
            'status' => true,
            'message' => 'Estudiante localizado',
            'data' => $estudiante
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estudiante $estudiante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'idEstudiante'=>'required|string|max:80',
            'nombres' => 'required|string|max:80',
            'aPaterno' => 'required|string|max:120',
            'aMaterno' => 'required|string|max:120',
            'sexo' => 'required|string|max:1',
            'celularestudiante' => 'required|string|max:9',
            'celularapoderado' => 'required|string|max:9',
            'fechaNacimiento' => 'nullable|date',
            'email' => 'required|email|max:220',
            'anoculminado' => 'required|string|max:45',
            'Nrodocumento' => 'nullable|string|max:45',
            'tipodocumento' => 'nullable|string|max:45',
            'direccion' => 'required|string|max:45',
            'foto' => 'nullable|binary',
           
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error en actualizar Estudiante',
                'errors' => $validator->errors()
            ], 422);
        }

        $estudiante = Estudiante::findOrFail($id);
        $estudiante->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Estudiante Actualizado ',
            'data' => $estudiante
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $estudiante = Estudiante::findOrFail($id);
        $estudiante->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'estusiante eliminado '
        ], 204);
    }
}
