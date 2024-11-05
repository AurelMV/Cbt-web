<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = ['nombreCurso'];

    public function docenteCurso()
    {
        return $this->belongsTo(DocenteCurso::class);
    }
}
