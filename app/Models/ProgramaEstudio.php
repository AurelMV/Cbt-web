<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramaEstudio extends Model
{
    protected $table = 'programa_estudios';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre_programa'];


    
    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'idprogramaestudios', 'id');
    }

    public function inscripcionesTemporales()
    {
        return $this->hasMany(InscripcionTemporal::class, 'idprogramaestudios', 'id');
    }
}
