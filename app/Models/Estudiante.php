<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
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
        'foto',
        
    ];
    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'idEstudiante', 'idEstudiante');
    }
}
