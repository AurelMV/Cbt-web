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
        $validatedData = $request->validate([
            'nombres' => 'required|string|max:80',
            'aPaterno' => 'required|string|max:120',
            'aMaterno' => 'required|string|max:120',
            'sexo' => 'required|string|size:1',
            'celularestudiante' => 'required|string|size:9',
            'celularapoderado' => 'required|string|size:9',
            'fechaNacimiento' => 'nullable|date',
            'email' => 'required|email|max:220|unique:inscripcion_temporals',
            'anoculminado' => 'required|string|max:45',
            'Nrodocumento' => 'nullable|string|max:45',
            'tipodocumento' => 'nullable|string|max:45',
            'direccion' => 'required|string|max:45',
            'fotoDNI' => 'nullable|file|mimes:jpeg,png,jpg|max:2048', // Tamaño máximo 2MB
            'fecha' => 'required|date',
            'monto' => 'required|integer',
            'medioPago' => 'required|string|max:20',
            'nroVoucher' => 'required|string|max:10',
            'fotoVoucher' => 'nullable|file|mimes:jpeg,png,jpg|max:2048', // Tamaño máximo 2MB
            'estado' => 'string|in:Pendiente,Aprobado,Rechazado',
            'idprogramaestudios' => 'required|exists:programa_estudios,id',
            'idciclo' => 'required|exists:ciclos,id',
            'idcolegio' => 'required|exists:colegios,id',
           
        ]);
    
        // Procesar las imágenes si existen
        $fotoDNI = $request->hasFile('fotoDNI') 
            ? file_get_contents($request->file('fotoDNI')->getRealPath()) 
            : null;
    
        $fotoVoucher = $request->hasFile('fotoVoucher') 
            ? file_get_contents($request->file('fotoVoucher')->getRealPath()) 
            : null;
    
        // Crear el registro en la base de datos
        InscripcionTemporal::create([
            'nombres' => $validatedData['nombres'],
            'aPaterno' => $validatedData['aPaterno'],
            'aMaterno' => $validatedData['aMaterno'],
            'sexo' => $validatedData['sexo'],
            'celularestudiante' => $validatedData['celularestudiante'],
            'celularapoderado' => $validatedData['celularapoderado'],
            'fechaNacimiento' => $validatedData['fechaNacimiento'],
            'email' => $validatedData['email'],
            'anoculminado' => $validatedData['anoculminado'],
            'Nrodocumento' => $validatedData['Nrodocumento'],
            'tipodocumento' => $validatedData['tipodocumento'],
            'direccion' => $validatedData['direccion'],
            'fotoDNI' => $fotoDNI,
            'fecha' => $validatedData['fecha'],
            'monto' => $validatedData['monto'],
            'medioPago' => $validatedData['medioPago'],
            'nroVoucher' => $validatedData['nroVoucher'],
            'fotoVoucher' => $fotoVoucher,
            'estado' => $validatedData['estado'] ?? 'Pendiente',
            'idprogramaestudios' => $validatedData['idprogramaestudios'],
            'idciclo' => $validatedData['idciclo'],
            'idcolegio' => $validatedData['idcolegio'],
        ]);
    
        // Retornar una respuesta (puede ser un redireccionamiento o JSON)
        return redirect()->route('inscripcion-temporals.index')->with('success', 'Inscripción registrada exitosamente.');
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
