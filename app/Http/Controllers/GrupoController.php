<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use App\Models\Estudiante;
use App\Models\Grupo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grupoID = request()->input('grupo_id');
        $grupos = Grupo::with('ciclo')->get()->map(function ($grupo) {
            return [
                'id' => $grupo->id,
                'nombre' => $grupo->nombre,
                'aforo' => $grupo->aforo,
                'estado' => $grupo->estado,
                'estadonombre' => $grupo->estado ? 'Activo' : 'Inactivo',
                'ciclo' => $grupo->ciclo ? $grupo->ciclo->nombre : 'Sin ciclo',
                'idciclo' => $grupo->idciclo
            ];
        });
        $estudiantes = Estudiante::join('inscripcions', 'estudiantes.id', '=', 'inscripcions.idEstudiante')
        ->where('inscripcions.idGrupos', $grupoID)
        ->selectRaw('estudiantes.id, CONCAT(nombres, " ", aPaterno, " ", aMaterno) as nombre_completo, inscripcions.estadopago')
        ->get()->map(function ($estudiante) {
            return [
                'id' => $estudiante->id,
                'nombre_completo' => $estudiante->nombre_completo,
                'estadopago' => $estudiante->estadopago
            ];
        });
        $estudiantesDeudores = Estudiante::join('inscripcions', 'estudiantes.id', '=', 'inscripcions.idEstudiante')
        ->where('inscripcions.estadopago', 0)
        ->where('inscripcions.idGrupos', $grupoID)
        ->selectRaw('estudiantes.id, CONCAT(nombres, " ", aPaterno, " ", aMaterno) as nombre_completo, inscripcions.estadopago')
        ->get()->map(function ($estudiante) {
            return [
                'id' => $estudiante->id,
                'nombre_completo' => $estudiante->nombre_completo,
                'estadopago' => $estudiante->estadopago
            ];
        });
        $ciclos = Ciclo::all();

        return Inertia::render('GruposEstudio', [
            'grupos' => $grupos,
            'ciclos' => $ciclos,
            'estudiantes' => $estudiantes,
            'estudiantesDeudores' => $estudiantesDeudores
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
            'aforo' => 'required|int',
            'estado' => 'required|boolean',
            'idciclo' => 'required|int'
        ]);

        Grupo::create($validate);

        return redirect()->route('grupos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $grupo = Grupo::findOrFail($id);

        return Inertia::render('GruposEstudio', [
            'grupo' => $grupo
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
            'aforo' => 'required|int',
            'estado' => 'required|boolean',
            'idciclo' => 'required|int'
        ]);

        Grupo::findOrFail($id)->update($validate);

        return redirect()->route('grupos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $grupo = Grupo::findOrFail($id);
        $grupo->delete();

        return redirect()->route('grupos.index');
    }
}
