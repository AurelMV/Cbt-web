<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    protected $fillable = ['nombre', 'aPaterno', 'aMaterno', 'dni', 'sexo', 'celular', 'fechaNacimiento', 'email', 'estado'];

    public function docenteCurso()
    {
        return $this->belongsTo(DocenteCurso::class);
    }
}
