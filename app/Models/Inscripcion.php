<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    protected $table = 'Inscripcion';
    protected $primaryKey = 'id';
    protected $fillable = [''];

    public function ciclos() {
        return $this->belongsTo(Ciclo::class);
    }

    public function programaEstudio() {
        return $this->belongsTo(ProgramaEstudio::class);
    }
}
