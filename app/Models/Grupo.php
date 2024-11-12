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

    public function ciclo() {
        return $this->belongsTo(Ciclo::class, 'idciclo');
    }

    public function docenteCurso() {
        return $this->belongsTo(DocenteCurso::class);
    }
}
