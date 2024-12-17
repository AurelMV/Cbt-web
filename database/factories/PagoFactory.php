<?php

namespace Database\Factories;

use App\Models\Pago;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pago>
 */
class PagoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Pago::class;

    public function definition(): array
    {
        return [
            'fecha' => $this->faker->date(),
            'monto' => $this->faker->numberBetween(50, 1000),
            'medioPago' => $this->faker->randomElement(['Caja',  'Deposito']),
            'nroVoucher' => $this->faker->numerify('##########'),
            'fotoVoucher' => null, // Opcional
            'idInscripcion' => \App\Models\Inscripcion::factory(),
        ];
    }
}
