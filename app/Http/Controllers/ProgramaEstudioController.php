<?php

namespace App\Http\Controllers;

use App\Models\ProgramaEstudio;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class ProgramaEstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programasEstudio = ProgramaEstudio::all();

        return Inertia::render('ProgramasEstudio/ProgramasEstudio', [
            'programasEstudio' => $programasEstudio
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('programasestudio/frmProgramaCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request -> validate([
            'nombre_programa' => 'required|string|max:255'
        ]);

        $programaEstudio = ProgramaEstudio::create($request->all());

        //return redirect()->route('programaestudio.index')->with('succes', 'Programa de estudio registrado exitósamente');
        return response ()->json($programaEstudio);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProgramaEstudio $programaEstudio)
    {
        return Inertia::render('ProgramasEstudio/Show', [
            'programaEstudio' => $programaEstudio
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProgramaEstudio $programaEstudio)
    {
        return Inertia::render('ProgramasEstudio/frmProgramaEdit', [
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

        //return redirect()->route('programaestudio.index')->with('succes', 'Programa de estudio actualizado exitosamente');
        return response()->json(['success' => true, 'message' => 'Programa de estudio actualizado exitosamente', 'programaEstudio' => $programaEstudio]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgramaEstudio $programaEstudio)
    {
        $programaEstudio->delete();

        Log::info('Programa de estudio eliminado exitosamente', ['programaEstudio' => $programaEstudio]);
        //return redirect()->route('programaestudio.index')->with('succes', 'Programa de estudio eliminado exitosamente');
        return response()->json(['message' => 'Programa de estudio eliminado exitosamente']);
    }
}
