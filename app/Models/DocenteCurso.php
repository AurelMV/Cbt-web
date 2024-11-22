<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocenteCurso extends Model
{
    use HasFactory;

    protected $fillable = ['idCurso', 'idDocente', 'idGrupo'];

    public function docente()
    {
        return $this->belongsTo(Docente::class, 'idDocente', 'id');
    }

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'idCurso', 'id');
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupo', 'id');
    }
}
