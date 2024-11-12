<?php

namespace App\Http\Controllers;

use App\Models\DocenteCurso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocenteCursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $docenteCursos = DocenteCurso::all();

        return Inertia::render('DocentesCursosGrupos', [
            'docenteCursos' => $docenteCursos
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
            'idcurso' => 'required|int',
            'idDocente' => 'required|int',
            'idGrupos' => 'required|int',
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
            'idcurso' => 'required|int',
            'idDocente' => 'required|int',
            'idGrupos' => 'required|int',
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
