<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Colegio;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;


class ColegioController extends Controller
{
    public function index()
    {
        $colegio = Colegio::all();
        return response()->json(
            [
                'status' => true,
                'message' => 'listado de datos',
                'data' => $colegio,
            ],
            200
        );
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombrecolegio' => 'required|string|max:255',
            'Distrito_idDistrito' => 'required|integer',
            'codModular' => 'required|string|max:255',
            'modalidad' => 'required|string|max:255',
            'gestion' => 'required|string|max:255',
            'latitud' => 'required|numeric|between:-90,90',
            'longitud' => 'required|numeric|between:-180,180',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'ERor en la VAlidacion',
                    'data' => $validator->errors(),
                ],
                422
            );
        }
        $colegio = colegio::create($request->all());
        return response()->json(
            [
                'status' => true,
                'message' => 'Correcto creacion',
                'data' => $colegio,
            ],
            201
        );
    }


    public function show(string $id)
    {
        $colegio = Colegio::findOrFail($id);
        return response()->json(
            [
                'status' => true,
                'message' => 'listado de datos',
                'data' => $colegio,
            ],
            200
        );
    }


    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nombrecolegio' => 'required|string|max:255',
            'Distrito_idDistrito' => 'required|integer',
            'codModular' => 'required|string|max:255',
            'modalidad' => 'required|string|max:255',
            'gestion' => 'required|string|max:255',
            'latitud' => 'required|numeric|between:-90,90',
            'longitud' => 'required|numeric|between:-180,180',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'ERor en la VAlidacion',
                    'data' => $validator->errors(),
                ],
                422
            );
        }
        $colegio = Colegio::findOrFail($id);
        $colegio->update($request->all());
        return response()->json(
            [
                'status' => true,
                'message' => 'Correcto acutalizacioin',
                'data' => $colegio,
            ],
            200
        );
    }
    public function destroy(string $id)
    {
        $colegio = Colegio::findOrFail($id);
        $colegio->delete();
        return response()->json(
            [
                'status' => true,
                'message' => 'Correcto acutalizacioin',
                'data' => $colegio,
            ],
            204
        );
    }
    public function Consulta(string $id)
    {
        $colegio = Colegio::where('Distrito_idDistrito', $id)->get();

        // Verificar si se encontraron resultados
        if ($colegio->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No se encontraron provincias para este departamento',
                'data' => [''],
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Listado de provincias',
            'data' => $colegio,
        ], 200);
    }
    public function BusquedaCodModular(string $id)
    {
        $colegio = Colegio::where('nombrecolegio', 'like', '%' . $id . '%')
            ->orWhere('codModular', 'like', '%' . $id . '%') // Agregar búsqueda por codModular
            ->take(20) // Limitar a los primeros 20 resultados
            ->get();

        // Filtrar los resultados: buscar solo aquellos que contienen la subcadena de forma válida
        $colegioFiltrado = $colegio->filter(function ($item) use ($id) {
            return (stripos($item->nombrecolegio, $id) !== false ||
                stripos($item->codModular, $id) !== false) && // Filtrar por nombrecolegio o codModular
                strpos($item->nombrecolegio, $id) !== 0;
        });

        // Si encontramos resultados después del filtrado
        if ($colegioFiltrado->isNotEmpty()) {
            return response()->json([
                'status' => true,
                'message' => 'Listado de colegios',
                'data' => $colegioFiltrado,
            ], 200);
        }

        // Verificar si se encontraron resultados
        if ($colegio->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No se encontro el Colegio',
                'data' => [''],
            ], 404);
        }
    }
}
