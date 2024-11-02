<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    use HasFactory;
    protected $table = 'grupos';
    protected $primaryKey = 'idGrupos';

    protected $fillable = [
        'nombreGrupo',
        'aforo',
        'estado',
        'idciclo',
    ];

    public function cicloInscripcion()
    {
        return $this->belongsTo(CicloInscripcion::class, 'idciclo', 'idciclo');
    }

    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'idGrupos', 'idGrupos');
    }
}
