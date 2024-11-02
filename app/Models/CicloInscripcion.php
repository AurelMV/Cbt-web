<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CicloInscripcion extends Model
{
    use HasFactory;

    protected $table = 'cicloInscripcion';
    protected $primaryKey = 'idciclo';

    protected $fillable = [
        'nombreCiclo',
        'fechainicio',
        'fechafin',
    ];

    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'idciclo', 'idciclo');
    }
}
