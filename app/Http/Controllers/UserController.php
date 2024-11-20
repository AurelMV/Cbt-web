<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // Mostrar lista de usuarios
    public function index()
    {
        $users = User::with('roles')->get();

        $users = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'nombres' => $user->nombres,
                'a_paterno' => $user->a_paterno,
                'a_materno' => $user->a_materno,
                'estado' => $user->estado,
                'roles' => $user->getRoleNames(),
            ];
        });

        return Inertia::render('Users/UserManager', [
            'users' => $users,
        ]);
    }

    // Mostrar formulario para crear un nuevo usuario
    public function create()
    {
        return inertia('Users/Create');
    }

    // Guardar un nuevo usuario
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'nombres' => 'required|string|max:255',
            'a_paterno' => 'required|string|max:255',
            'a_materno' => 'required|string|max:255',
            'estado' => 'required|in:activo,inactivo',
            'roles' => 'required|in:admin,empleado',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'nombres' => $request->nombres,
            'a_paterno' => $request->a_paterno,
            'a_materno' => $request->a_materno,
            'estado' => $request->estado,
        ]);

        $user->assignRole($request->roles);

        return response()->json($user);
    }

    // Mostrar detalles de un usuario específico
    public function show(User $user)
    {
        return inertia('Users/Show', ['user' => $user]);
    }

    // Mostrar formulario para editar un usuario
    public function edit(User $user)
    {
        return inertia('Users/Edit', ['user' => $user]);
    }

    // Actualizar información de un usuario
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:8',
            'nombres' => 'required|string|max:255',
            'a_paterno' => 'required|string|max:255',
            'a_materno' => 'required|string|max:255',
            'estado' => 'required|in:activo,inactivo',
            'roles' => 'required|in:admin,empleado',
        ]);

        $user->syncRoles($request->roles);
       
        $user->update($request->all());

        return response()->json(['success' => true, 'message' => 'Ciclo actualizado exitosamente', 'ciclo' => $user]);
    }

    // Eliminar un usuario
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente.']);
    }
}
