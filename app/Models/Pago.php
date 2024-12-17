<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;
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
