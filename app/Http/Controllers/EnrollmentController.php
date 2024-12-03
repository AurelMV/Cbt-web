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
        ->orderBy('programa_estudios.nombre_programa', 'asc')
        ->get();

        $inscritosPorCiclo = Ciclo::leftJoin('inscripcions', 'ciclos.id', '=', 'inscripcions.idciclo')
        ->selectRaw('ciclos.nombre as ciclo, count(inscripcions.id) as inscritos')
        ->groupBy('ciclos.nombre')
        ->get();

        $inscritosPorSexo = Inscripcion::leftJoin('estudiantes', 'inscripcions.idEstudiante', '=', 'estudiantes.id')
        ->selectRaw('estudiantes.sexo as sexo, count(inscripcions.id) as inscritos')
        ->groupBy('estudiantes.sexo')
        ->get();

        Inertia::render('./Components/Diagrama2', [
            'programas' => $programas,
            'inscritosPorPrograma' => $inscritosPorPrograma
        ]);

        Inertia::render('./Components/DiagramaCiclos', [
            'inscritosPorCiclo' => $inscritosPorCiclo
        ]);

        Inertia::render('./Components/Diagrama3', [
            'inscritosPorSexo' => $inscritosPorSexo
        ]);

        return Inertia::render('Estadisticas', [
            'programas' => $programas,
            'inscritosPorPrograma' => $inscritosPorPrograma,
            'inscritosPorCiclo' => $inscritosPorCiclo,
            'inscritosPorSexo' => $inscritosPorSexo
        ]);
    }
}
