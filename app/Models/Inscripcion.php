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
        'estadopa',
        'idEstudiante',
        'idprogramaestudios',
        'idciclo',
        'idGrupos',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante', 'idEstudiante');
    }

    public function programaEstudios()
    {
        return $this->belongsTo(ProgramaEstudio::class, 'idprogramaestudios', 'idprogramaestudios');
    }

    public function cicloInscripcion()
    {
        return $this->belongsTo(Ciclo::class, 'idciclo', 'idciclo');
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupos', 'idGrupos');
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'idInscripcion', 'idInscripcion');
    }
    public function usuario()
    {
        return $this->hasMany(User::class, 'idInscripcion', 'idInscripcion');
    }



   
}
