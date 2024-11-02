<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public $timestamps=false;
    protected $table = 'pagos';
    protected $primaryKey = 'idPagos';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
       'idPagos',
        'fecha',
        'monto',
        'medioPago',
        'nroVoucher',
        'idInscripcion',
    ];

    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'idInscripcion', 'idInscripcion');
    }

}
