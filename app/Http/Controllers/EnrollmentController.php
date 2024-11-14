<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use App\Models\Inscripcion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    //
    public function index()
    {
        $data = Inscripcion::with('ciclo')->get();

        return Inertia::render('Estadisticas', [
            'data' => $data,
        ]);
    }
}
