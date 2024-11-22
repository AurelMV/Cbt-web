<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $fillable = [
   
        'fecha',
        'monto',
        'medioPago',
        'nroVoucher',
        'idInscripcion',
    ];

    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'idInscripcion', 'id');
    }
}
