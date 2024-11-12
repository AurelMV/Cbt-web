<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $docentes = Docente::all()->map(function ($docente) {
            return [
                'id' => $docente->id,
                'nombre' => $docente->nombre,
                'aPaterno' => $docente->aPaterno,
                'aMaterno' => $docente->aMaterno,
                'dni' => $docente->dni,
                'sexo' => $docente->sexo,
                'celular' => $docente->celular,
                'fechaNacimiento' => $docente->fechaNacimiento,
                'email' => $docente->email,
                'estado' => $docente->estado ? 'Activo' : 'Inactivo',
            ];
        });

        return Inertia::render('Docentes', [
            'docentes' => $docentes
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
        $validate = $request->validate([
            'nombre' => 'required|string',
            'aPaterno' => 'required|string',
            'aMaterno' => 'required|string',
            'dni' => 'required|string|unique:docentes,dni',
            'sexo' => 'required|string',
            'celular' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'email' => 'required|string',
            'estado' => 'required|boolean',
        ]);

        Docente::create($validate);

        return redirect()->route('docentes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $docente = Docente::findOrFail($id);

        return Inertia::render('NombreDeComponente', [
            'docente' => $docente
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate = $request->validate([
            'nombre' => 'required|string',
            'aPaterno' => 'required|string',
            'aMaterno' => 'required|string',
            'dni' => 'required|string|unique:docentes,dni,' . $id,
            'sexo' => 'required|string',
            'celular' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'email' => 'required|string',
            'estado' => 'required|boolean',
        ]);

        $docente = Docente::findOrFail($id);
        $docente->update($validate);

        return redirect()->route('docentes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $docente = Docente::findOrFail($id);
        $docente->delete();

        return redirect()->route('docentes.index');
    }
}
