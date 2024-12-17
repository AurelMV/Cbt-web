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
        'estado',
        'idprogramaestudios',
        'idciclo',
        'idcolegio'
    ];

    // Relación con el modelo ProgramaEstudios
    public function programaEstudio()
    {
        return $this->belongsTo(ProgramaEstudio::class, 'idprogramaestudios');
    }

    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class, 'idciclo');
    }

    public function colegio()
    {
        return $this->belongsTo(Colegio::class, 'idcolegio');
    }
}
