<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provincia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProvinciaController extends Controller
{
    public function index()
    {
        $provincia=Provincia::all();
        return response()->json([
            'status'=>true,
            'message'=>'listado de datos',
            'data'=>$provincia,
        ],200
        );
    }

    public function show(string $id)
    {
        $provincia=Provincia::findOrFail($id);
        return response()->json([
            'status'=>true,
            'message'=>'listado de datos',
            'data'=>$provincia,
        ],200
        );
    }
}
