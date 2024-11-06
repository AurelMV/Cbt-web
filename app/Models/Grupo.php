<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $table = 'Grupos';
    protected $primaryKey = 'id';
    protected $fillable = ['nombreGrupo', 'aforo', 'estado', 'idciclo'];

    public function ciclos() {
        return $this->belongsTo(Ciclo::class);
    }

    public function docenteCurso() {
        return $this->belongsTo(DocenteCurso::class);
    }
}
