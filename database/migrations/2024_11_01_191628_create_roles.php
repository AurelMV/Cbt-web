<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $role1 = Role::create(['name' => 'admin']);
        $role2 = Role::create(['name' => 'empleado']);

        //Asignar rol de administrador al coordinador
        $user = User::create([
            'name' => 'admin',
            'email' => 'coordinador@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        $user -> assignRole($role1);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
    }
};
