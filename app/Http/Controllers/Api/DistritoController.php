<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Distrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class DistritoController extends Controller
{
    public function index()
    {
        $distrito=Distrito::all();
        return response()->json([
            'status'=>true,
            'message'=>'listado de datos',
            'data'=>$distrito,
        ],200
        );
    }

    public function show(string $id)
    {
        $distrito=Distrito::findOrFail($id);
        return response()->json([
            'status'=>true,
            'message'=>'listado de datos',
            'data'=>$distrito,
        ],200
        );
    }
}
