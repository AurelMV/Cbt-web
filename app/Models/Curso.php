<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'descripcion'];

    public function docentecurso()
    {
        return $this->hasMany(DocenteCurso::class, 'idCurso', 'id');
    }
}
