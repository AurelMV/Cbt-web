<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CicloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ciclos = Ciclo::all();

        return Inertia::render('Ciclos/Ciclos', [
            'ciclos' => $ciclos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Ciclos/frmCicloCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'estado' => 'required|string|in:En curso,Finalizado'
        ]);

        $ciclo = Ciclo::create($request->all());

        // return Inertia::render('Ciclos', [
        //     'ciclos' => Ciclo::all(),
        //     'succes', 'Ciclo registrado exitósamente'
        // ]);
        return response()->json($ciclo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ciclo $ciclo)
    {
        return Inertia::render('Ciclos/Show', [
            'ciclo' => $ciclo
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ciclo $ciclo)
    {
        return Inertia::render('Ciclos/frmCicloEdit', [
            'ciclo' => $ciclo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ciclo $ciclo)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'estado' => 'required|string|in:En curso,Finalizado'
        ]);

        $ciclo->update($request->all());

        //return redirect()->route('ciclos.index')->with('succes', 'Ciclo actualizado exitosamente');
        return response()->json(['success' => true, 'message' => 'Ciclo actualizado exitosamente', 'ciclo' => $ciclo]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ciclo $ciclo)
    {
        $ciclo->delete();
        //Log::info('Ciclo de estudio eliminado exitosamente', ['programaEstudio' => $ciclo]);
        return response()->json(['message' => 'Ciclo eliminado exitosamente']);
    }
}
