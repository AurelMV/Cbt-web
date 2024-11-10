<?php

namespace App\Http\Controllers;

use App\Models\ProgramaEstudio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramaEstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programasEstudio = ProgramaEstudio::all();
        return Inertia::render('ProgramasEstudio', [
            'programasEstudio' => $programasEstudio
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('programaestudio/frmProgramaCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request -> validate([
            'nombre_programa' => 'required|string|max:255'
        ]);

        ProgramaEstudio::create($request->all());

        return redirect()->route('programaestudio.index')->with('succes', 'Programa de estudio registrado exitósamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProgramaEstudio $programaEstudio)
    {
        return Inertia::render('ProgramaEstudio/show', [
            'programaEstudio' => $programaEstudio
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProgramaEstudio $programaEstudio)
    {
        return Inertia::render('ProgramaEstudio/frmProgramaEdit', [
            'programaEstudio' => $programaEstudio
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProgramaEstudio $programaEstudio)
    {
        $request -> validate([
            'nombre_programa' => 'required|string|max:255'
        ]);

        $programaEstudio->update($request->all());

        return redirect()->route('programaestudio.index')->with('succes', 'Programa de estudio actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgramaEstudio $programaEstudio)
    {
        $programaEstudio->delete();
        return redirect()->route('programaestudio.index')->with('succes', 'Programa de estudio eliminado exitosamente');
    }
}
