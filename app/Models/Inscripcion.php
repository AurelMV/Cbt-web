<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public $timestamps=false;
    protected $table = 'inscripcion';
    protected $primaryKey = 'idInscripcion';

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
        return $this->belongsTo(ProgramaEstudios::class, 'idprogramaestudios', 'idprogramaestudios');
    }

    public function cicloInscripcion()
    {
        return $this->belongsTo(CicloInscripcion::class, 'idciclo', 'idciclo');
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupos', 'idGrupos');
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'idInscripcion', 'idInscripcion');
    }

}
