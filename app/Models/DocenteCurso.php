<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocenteCurso extends Model
{
    protected $fillable = ['idcurso', 'idDocente', 'idGrupos'];

    public function docente()
    {
        return $this->hasMany(Docente::class);
    }

    public function curso()
    {
        return $this->hasMany(Curso::class);
    }

    public function grupo()
    {
        return $this->hasMany(Grupo::class);
    }
}
