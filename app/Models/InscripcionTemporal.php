<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InscripcionTemporal extends Model
{
    protected $table = 'inscripcion_temporals';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombres',
        'aPaterno',
        'aMaterno',
        'sexo',
        'celularestudiante',
        'celularapoderado',
        'fechaNacimiento',
        'email',
        'anoculminado',
        'Nrodocumento',
        'tipodocumento',
        'direccion',
        'fotoDNI',
        'fecha',
        'monto',
        'medioPago',
        'nroVoucher',
        'fotoVoucher',
        'idprogramaestudios',
    ];

    // Relación con el modelo ProgramaEstudios
    public function programaEstudios()
    {
        return $this->belongsTo(ProgramaEstudio::class, 'idprogramaestudios');
    }
}
