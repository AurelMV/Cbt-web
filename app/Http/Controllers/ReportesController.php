<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Grupo;
use App\Models\Ciclo;
use App\Models\ProgramaEstudio;
use App\Models\Estudiante;


class ReportesController extends Controller
{
    
    public function index()
    {
        $grupos=Grupo::all();
        $estudiantes=Estudiante::all();
        $ciclos=Ciclo::all();
        $programa=ProgramaEstudio::all();
        return Inertia::render('Reportes',[
            'grupos'=>$grupos,
            'estudiantes'=>$estudiantes,
            'ciclos'=>$ciclos,
            'programa'=>$programa
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
