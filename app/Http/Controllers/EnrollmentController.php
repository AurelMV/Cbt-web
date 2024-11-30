<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use App\Models\Inscripcion;
use App\Models\ProgramaEstudio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    //
    public function index()
    {
        $programas = ProgramaEstudio::all()->map(function ($programa) {
            return [
                'id' => $programa->id,
                'nombre' => $programa->nombre_programa,
            ];
        });

        $inscritosPorPrograma = ProgramaEstudio::leftJoin('inscripcions', 'programa_estudios.id', '=', 'inscripcions.idprogramaestudios')
        ->selectRaw('programa_estudios.nombre_programa as programa, count(inscripcions.id) as inscritos')
        ->groupBy('programa_estudios.nombre_programa')
        ->get();

        Inertia::render('./Components/Diagrama2', [
            'programas' => $programas,
            'inscritosPorPrograma' => $inscritosPorPrograma
        ]);

        return Inertia::render('Estadisticas', [
            'programas' => $programas,
            'inscritosPorPrograma' => $inscritosPorPrograma
        ]);
    }
}
