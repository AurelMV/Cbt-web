<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    use HasFactory;

    protected $table = 'grupos';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'aforo', 'estado', 'idciclo'];

    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class, 'idciclo', 'id');
    }



public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'idGrupos', 'id');
    }

    public function docenteCurso() {
        return $this->belongsTo(DocenteCurso::class);
    }
}
