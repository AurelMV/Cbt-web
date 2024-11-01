<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'aPaterno',
        'aMaterno',
        'sexo',
        'celularestudiante',
        'celularapoderado',
        'fechaNacimiento',
        'email',
        'anoculminado',
        'Nrodocumento',
        'tipodocumento',
        'direccion',
        'foto'

    ];


}
