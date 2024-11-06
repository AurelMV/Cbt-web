<?php

namespace App\Http\Controllers;

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
        $grupos = Grupo::all();
        return Inertia::render('NombreDeComponente', [
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
            'nombreGrupo' => 'required|string',
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

        return Inertia::render('NombreDeComponente', [
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
            'nombreGrupo' => 'required|string',
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
