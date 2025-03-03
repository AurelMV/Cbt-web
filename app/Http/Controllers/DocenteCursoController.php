<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Docente;
use App\Models\DocenteCurso;
use App\Models\Grupo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocenteCursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $docenteCursos = DocenteCurso::with('docente', 'curso', 'grupo')->get()->map(function ($docenteCurso) {
            return [
                'id' => $docenteCurso->id,
                'docente' => $docenteCurso->docente ? $docenteCurso->docente->nombre . ' ' . $docenteCurso->docente->aPaterno . ' ' . $docenteCurso->docente->aMaterno : 'Sin docente',
                'idDocente' => $docenteCurso->idDocente,
                'curso' => $docenteCurso->curso ? $docenteCurso->curso->nombre : 'Sin curso',
                'idCurso' => $docenteCurso->idCurso,
                'grupo' => $docenteCurso->grupo ? $docenteCurso->grupo->nombre : 'Sin grupo',
                'idGrupo' => $docenteCurso->idGrupo,
            ];
        });
        $docentesActivos = Docente::where('estado', 1)
        ->selectRaw('id, CONCAT(nombre, " ", aPaterno, " ", aMaterno) as nombre_completo')
        ->get();
        $cursos = Curso::all();
        $grupos = Grupo::all();
        
        return Inertia::render('DocentesCursosGrupos', [
            'docenteCursos' => $docenteCursos,
            'docentesActivos' => $docentesActivos,
            'cursos' => $cursos,
            'grupos' => $grupos
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
            'idCurso' => 'required|int',
            'idDocente' => 'required|int',
            'idGrupo' => 'required|int',
        ]);

        DocenteCurso::create($validate);

        return redirect()->route('docenteCursos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $docenteCurso = DocenteCurso::findOrFail($id);

        return Inertia::render('NombreDeComponente', [
            'docenteCurso' => $docenteCurso
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
            'idCurso' => 'required|int',
            'idDocente' => 'required|int',
            'idGrupo' => 'required|int',
        ]);

        $docenteCurso = DocenteCurso::findOrFail($id);
        $docenteCurso->update($validate);

        return redirect()->route('docenteCursos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $docenteCurso = DocenteCurso::findOrFail($id);
        $docenteCurso->delete();

        return redirect()->route('docenteCursos.index');
    }
}
