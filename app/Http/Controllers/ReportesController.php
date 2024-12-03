<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Grupo;
use App\Models\Ciclo;
use App\Models\Inscripcion;
use App\Models\ProgramaEstudio;
use App\Models\Estudiante;
use Illuminate\Support\Facades\DB;


class ReportesController extends Controller
{

    public function index()
    {
        $grupos = Grupo::all();
        $estudiantes = Estudiante::all();
        $ciclos = Ciclo::all();
        $programa = ProgramaEstudio::all();
        return Inertia::render('Reportes', [
            'grupos' => $grupos,
            'estudiantes' => $estudiantes,
            'ciclos' => $ciclos,
            'programa' => $programa
        ]);
    }

    public function Grupo(string $idCiclo)
    {
        $grupos = Grupo::where('idciclo', $idCiclo)->get();
        return response()->json($grupos);
    }

    public function Programa()
    {
        $grupos = ProgramaEstudio::all();
        return response()->json($grupos);
    }

    public function DataPrograma(string $idCiclo, string $idPrograma)
    {
        $inscripcion = Inscripcion::with('Estudiante', 'Grupo', 'ProgramaEstudio', 'Ciclo')
            ->where('idciclo', $idCiclo)
            ->where('idprogramaestudios', $idPrograma)
            ->get();

        return response()->json($inscripcion);
    }

    public function DataGrupo(string $idCiclo, string $idgrupo)
    {
        $inscripcion = Inscripcion::with('Estudiante', 'Grupo', 'ProgramaEstudio', 'Ciclo')
            ->where('idciclo', $idCiclo)
            ->where('idGrupos', $idgrupo)
            ->get();

        return response()->json($inscripcion);
    }

    public function BusCiclo(string $idCiclo)
    {
        $inscripcion = Inscripcion::with('Estudiante', 'Grupo', 'ProgramaEstudio', 'Ciclo')
            ->where('idciclo', $idCiclo)
            ->get();
        return response()->json($inscripcion);
    }
}
