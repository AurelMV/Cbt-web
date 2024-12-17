<?php

namespace Database\Factories;

use App\Models\Estudiante;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Estudiante>
 */
class EstudianteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Estudiante::class;
    public function definition(): array
    {
        return [
           'nombres' => $this->faker->firstName,
            'aPaterno' => $this->faker->lastName,
            'aMaterno' => $this->faker->lastName,
            'sexo' => $this->faker->randomElement(['M', 'F']),
            'celularestudiante' => $this->faker->numerify('9########'),
            'celularapoderado' => $this->faker->numerify('9########'),
            'fechaNacimiento' => $this->faker->date('Y-m-d', '2010-01-01'),
            'email' => $this->faker->unique()->safeEmail,
            'anoculminado' => $this->faker->year,
            'Nrodocumento' => $this->faker->numerify('########'),
            'tipodocumento' => $this->faker->randomElement(['DNI', 'Pasaporte', ]),
            'direccion' => $this->faker->text(20),
            'foto' => null, // Opcional
            'idcolegios' => 1,
        ];
    }
}
