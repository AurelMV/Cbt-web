<?php

namespace Database\Seeders;

use App\Models\Estudiante;
use App\Models\Inscripcion;
use App\Models\Pago;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Estudiante::factory(50)->create();
        Inscripcion::factory(30)->create();
        Pago::factory(100)->create();
    }
}
