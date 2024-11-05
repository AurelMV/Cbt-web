<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Departamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartamentoController extends Controller
{
    public function index()
    {
        $departamento=Departamento::all();
        return response()->json([
            'status'=>true,
            'message'=>'listado de datos',
            'data'=>$departamento,
        ],200
        );
    }

    public function show(string $id)
    {
        $departamento=Departamento::findOrFail($id);
        return response()->json([
            'status'=>true,
            'message'=>'listado de datos',
            'data'=>$departamento,
        ],200
        );
    }
    public function consulta(string $id)
    {
        $departamento=Departamento::findOrFail($id);
        return response()->json([
            'status'=>true,
            'message'=>'listado de datos',
            'data'=>$departamento,
        ],200
        );
    }
}
