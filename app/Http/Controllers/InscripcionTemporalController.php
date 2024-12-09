<?php

namespace App\Http\Controllers;

use App\Models\InscripcionTemporal;
use App\Http\Requests\StoreInscripcionTemporalRequest;
use App\Http\Requests\UpdateInscripcionTemporalRequest;
use Inertia\Inertia;

class InscripcionTemporalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $inscripcion="";
        
        return Inertia::render('StudentForm', [
            'inscripciones' => $inscripcion,
            'queryParams' => request()->query(),
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
    public function store(StoreInscripcionTemporalRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(InscripcionTemporal $inscripcionTemporal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InscripcionTemporal $inscripcionTemporal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInscripcionTemporalRequest $request, InscripcionTemporal $inscripcionTemporal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InscripcionTemporal $inscripcionTemporal)
    {
        //
    }
}
