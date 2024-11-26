<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Http\Requests\StoreInscripcionRequest;
use App\Http\Requests\UpdateInscripcionRequest;
use App\Models\Ciclo;
use App\Models\Estudiante;
use App\Models\Grupo;
use App\Models\Pago;
use App\Models\ProgramaEstudio;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use ReflectionFunctionAbstract;

use function Termwind\render;

class InscripcionController extends Controller
{
    public function index()
    {
        $inscripcion = Inscripcion::with(['estudiante', 'programaEstudio', 'ciclo', 'grupo'])->paginate(10);

        //return response()->json(

        //   $inscripcion, 

        //);
        $query = Inscripcion::with(['estudiante', 'programaEstudio', 'ciclo', 'grupo']);

        // Verificar si se pasó un parámetro de búsqueda por nombre del estudiante
        if (request()->has('name') && !empty(request('name'))) {
            $query->whereHas('estudiante', function ($subQuery) {
                $subQuery->where('nombres', 'like', '%' . request('name') . '%');
            });
        }
        if (request()->has('documento') && !empty(request('documento'))) {
            $query->whereHas('estudiante', function ($subQuery) {
                $subQuery->where('Nrodocumento', 'like', '%' . request('documento') . '%');
            });
        }


        // Filtrar por ciclo seleccionado si se proporciona
        if (request()->has('p_cicloinscripciones_id') && !empty(request('p_cicloinscripciones_id'))) {
            $query->where('idciclo', request('p_cicloinscripciones_id')); // Ajusta 'ciclo_id' según el nombre del campo en tu tabla
        }

        // Filtrar por grupo seleccionado si se proporciona
        if (request()->has('p_Grupos_id') && !empty(request('p_Grupos_id'))) {
            $query->where('idGrupos', request('p_Grupos_id')); // Ajusta 'grupo_id' según el nombre del campo en tu tabla
        }



        // Paginar los resultados
        $inscripcion = $query->paginate(5);




        return Inertia::render('GestionInscripciones', [
            'inscripciones' => $inscripcion,
            'queryParams' => request()->query(),
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
        /* $validator =Validator::make($request->all(), [
            'turno' => 'required|string|max:40',
            'fechaInscripcion' => 'required|date',
            'estadopa' => 'required|boolean',
            'idEstudiante' => 'required|string|exists:estudiantes,idEstudiante',
            'idprogramaestudios' => 'required|integer|exists:programaestudios,idprogramaestudios',
            'idciclo' => 'required|integer|exists:cicloInscripcion,idciclo',
            'idGrupos' => 'required|integer|exists:grupos,idGrupos'
        ]);
        

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Eror de creacion de Estudiante ',
                'errors' => $validator->errors()
            ], 422);
        }

        $inscripcion = Inscripcion::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Estudiante creado :)',
            'data' => $inscripcion
        ], 201);*/

        $validatedData = $request->validate([
            'nroDocumento' => 'required|numeric',
            'nombres' => 'required|string|max:255',
            'aPaterno' => 'required|string|max:255',
            'aMaterno' => 'required|string',
            'sexo' => 'required|string',
            'celularestudiante' => 'required|string',
            'celularapoderado' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'email' => 'required|email',
            'anoculminado' => 'required|string',
            'tipodocumento' => 'required|in:DNI,Pasaporte',
            'direccion' => 'nullable|string', // Cambiado a nullable en caso de que sea opcional
            'Colegios_id' => 'required|numeric',
            'turno' => 'required|string',
            'fechaInscripcion' => 'required|date', // Añadir este campo, que faltaba en el controlador
            'fechaPago' => 'required|date',
            'estadopago' => 'required|string',
            'Usuarios_id' => 'required|numeric',
            'Programaestudios_id' => 'required|numeric',
            'Grupos_id' => 'required|numeric',
            'cicloinscripciones_id' => 'required|numeric',
            'monto' => 'required|numeric',
            'medioPago' => 'required|string',
            'nroVoucher' => 'nullable|string' // Cambiado a nullable en caso de que sea opcional
        ]);

        // Llamada al procedimiento almacenado
        DB::select(
            'CALL registrarInscripcionYpago(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $validatedData['nroDocumento'],
                $validatedData['nombres'],
                $validatedData['aPaterno'],
                $validatedData['aMaterno'],
                $validatedData['sexo'],
                $validatedData['celularestudiante'],
                $validatedData['celularapoderado'],
                $validatedData['fechaNacimiento'],
                $validatedData['email'],
                $validatedData['anoculminado'],
                $validatedData['tipodocumento'],
                $validatedData['direccion'] ?? null, // Valor opcional con `?? null`
                $validatedData['Colegios_id'],
                $validatedData['turno'],
                $validatedData['fechaInscripcion'], // Incluido para el procedimiento
                $validatedData['estadopago'],
                $validatedData['Usuarios_id'],
                $validatedData['Programaestudios_id'],
                $validatedData['Grupos_id'],
                $validatedData['cicloinscripciones_id'],
                $validatedData['fechaPago'],
                $validatedData['monto'],
                $validatedData['medioPago'],
                $validatedData['nroVoucher'] ?? null // Valor opcional con `?? null`
            ]
        );

        // Retornar respuesta adecuada (elige uno de los dos siguientes según tu preferencia)
        // return redirect()->route('Page.Dashboard')->with('success', 'Inscripción realizada con éxito.');

        // Redirigir o retornar un mensaje de éxito

        //  return Inertia::render('GestionInscripciones'/*,[
        //'inscripcion'=>$inscripcion
        // ]*/);


    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $inscripcion = Inscripcion::select(
            'turno',
            'fechaInscripcion',
            'estadopa',
            'idEstudiante',
            'idprogramaestudios',
            'idciclo',
            'idGrupos',
        )

            ->findOrFail($id);

        return response()->json([
            'status' => true,
            'message' => 'Estudiante localizado',
            'data' => $inscripcion
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inscripcion $inscripcion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // En InscripcionController
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'idciclo' => 'required|exists:ciclos,id',
            'idprogramaestudios' => 'required|exists:programa_estudios,id',
            'idGrupos' => 'required|exists:grupos,id',
        ]);

        // Encuentra la inscripción y actualiza
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->update([
            'idciclo' => $validated['idciclo'],
            'idprogramaestudios' => $validated['idprogramaestudios'],
            'idGrupos' => $validated['idGrupos'],
        ]);

        // Redirige con mensaje de éxito
        return redirect()->route('gestInscripcion.index')->with('success', 'Inscripción actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();

        return response()->json([
            'status' => true,
            'message' => 'Inscripcion Eliminado ? '
        ], 204);
    }


    public function editarInscripcion($id)
    {
        // Obtener la inscripción por su ID
        $inscripcion = Inscripcion::with('estudiante', 'programaEstudio', 'ciclo', 'grupo')
            ->findOrFail($id);

        // Retornar los datos al frontend (React)
        return response()->json($inscripcion);
    }


    public function opciones()
    {
        $ciclos = Ciclo::with('grupos')->get();
        $programas = ProgramaEstudio::all();

        return response()->json([
            'ciclos' => $ciclos,
            'programas' => $programas,
        ]);
    }

    public function listaGrupos()
    {

        $grupo = Grupo::all();

        return inertia::render('Dashboard', [

            'grupo' => $grupo,
        ]);
    }

    public function listarprogramas()
    {
        $programas = ProgramaEstudio::all();

        return response()->json($programas);
    }
    public function ListadoGruposCiclos()
    {
        $ciclos = Ciclo::with('grupos')->get();
        return response()->json($ciclos);
    }







    public function registrarInscripcionYpago(Request $request)
    {
        DB::beginTransaction(); // Iniciar la transacción

        try {

            $estudiante = Estudiante::where('Nrodocumento', $request->input('p_nroDocumento'))->first();


            if (!$estudiante) {
                // Crear un nuevo estudiante
                $estudiante = Estudiante::create([
                    'nombres' => $request->input('p_nombres'),
                    'aPaterno' => $request->input('p_aPaterno'),
                    'aMaterno' => $request->input('p_aMaterno'),
                    'sexo' => $request->input('p_sexo'),
                    'celularestudiante' => $request->input('p_celularestudiante'),
                    'celularapoderado' => $request->input('p_celularapoderado'),
                    'fechaNacimiento' => $request->input('p_fechaNacimiento'),
                    'email' => $request->input('p_email'),
                    'anoculminado' => $request->input('p_anoculminado'),
                    'Nrodocumento' => $request->input('p_nroDocumento'),
                    'tipodocumento' => $request->input('p_tipodocumento'),
                    'direccion' => $request->input('p_direccion'),
                    'idcolegios' => $request->input('p_Colegios_id'),
                ]);
            }

            // Ahora, con el estudiante (nuevo o existente), registrar la inscripción
            $inscripcion = Inscripcion::create([
                'turno' => $request->input('p_turno'),
                'fechaInscripcion' => $request->input('p_fechaInscripcion'),
                'estadopago' => $request->input('p_estadopago'),
                'idEstudiante' => $estudiante->id, // Usar el id del estudiante recién creado o existente
                'idusuarios' => $request->input('p_Usuarios_id'),
                'idprogramaestudios' => $request->input('p_Programaestudios_id'),
                'idGrupos' => $request->input('p_Grupos_id'),
                'idciclo' => $request->input('p_cicloinscripciones_id'),
            ]);

            // Registrar el pago asociado a la inscripción
            Pago::create([
                'fecha' => $request->input('p_fechaPago'),
                'monto' => $request->input('p_monto'),
                'medioPago' => $request->input('p_medioPago'),
                'nroVoucher' => $request->input('p_nroVoucher'),
                'idInscripcion' => $inscripcion->id, // Asociar el pago a la inscripción creada
            ]);

            DB::commit(); // Confirmar la transacción

            return response()->json(['message' => 'Inscripción y pago registrados con éxito'], 201);
        } catch (\Exception $e) {
            DB::rollBack(); // Revertir la transacción en caso de error

            return response()->json([
                'message' => 'Error al registrar la inscripción y el pago: ' . $e->getMessage()
            ], 500);
        }
    }
}
