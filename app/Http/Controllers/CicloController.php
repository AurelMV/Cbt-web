<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CicloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ciclos = Ciclo::all();

        return Inertia::render('Ciclos/Index', [
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
            'fecha_fin' => 'required|date'
        ]);

        Ciclo::create($request->all());

        return redirect()->route('ciclos.index')->with('succes', 'Ciclo registrado exitósamente');
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
            'fecha_fin' => 'required|date'
        ]);

        $ciclo->update($request->all());

        return redirect()->route('ciclos.index')->with('succes', 'Ciclo actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ciclo $ciclo)
    {
        $ciclo->delete();

        return redirect()->route('ciclos.index')->with('succes', 'Ciclo eliminado correctamete');
    }
}
