<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{

    public $timestamps=false;
    protected $table = 'inscripcions';
    protected $primaryKey = 'id';

    protected $fillable = [
        'turno',
        'fechaInscripcion',
        'estadopago',
        'idEstudiante',
        'idprogramaestudios',
        'idciclo',
        'idusuarios',
        'idGrupos',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante', 'id');
    }

    public function programaEstudios()
    {
        return $this->belongsTo(ProgramaEstudio::class, 'idprogramaestudios', 'id');
    }

    public function cicloInscripcion()
    {
        return $this->belongsTo(Ciclo::class, 'idciclo', 'id');
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupos', 'id');
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'idInscripcion', 'id');
    }
    public function usuario()
    {
        return $this->hasMany(User::class, 'idInscripcion', 'id');
    }



   
}
