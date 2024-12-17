<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciclo extends Model
{
    protected $table = 'ciclos';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'fecha_inicio', 'fecha_fin', 'estado'];

    public function grupos()
    {
        return $this->hasMany(Grupo::class, 'idciclo', 'id');
    }


    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'idciclo', 'id');
    }

    public function inscripcionesTemporales()
    {
        return $this->hasMany(InscripcionTemporal::class, 'idciclo', 'id');
    }
}
