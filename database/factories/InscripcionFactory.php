<?php

namespace Database\Factories;

use App\Models\Inscripcion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inscripcion>
 */
class InscripcionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Inscripcion::class;

    public function definition(): array
    {
        return [
            'turno' => $this->faker->randomElement(['Mañana', 'Tarde', 'Noche']),
            'fechaInscripcion' => $this->faker->dateTimeThisYear(),
            'estadopago' => $this->faker->randomElement(['Pagado', 'Pendiente']),
            'idEstudiante' => \App\Models\Estudiante::factory(),
            'idprogramaestudios' => 2,
            'idusuarios' => 1,
            'idciclo' => 1,
            'idGrupos' =>2,
        ];
    }
}
