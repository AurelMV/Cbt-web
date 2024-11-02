<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProgramaEstudios extends Model
{

    use HasFactory;
    protected $table = 'programaestudios';
    protected $primaryKey = 'idprogramaestudios';

    protected $fillable = [
        'nombre',
    ];

    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'idprogramaestudios', 'idprogramaestudios');
    }
}
