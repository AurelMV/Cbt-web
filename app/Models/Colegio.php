<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{
    public $timestamps=false;
    protected $fillable = ['nombrecolegio','Distrito_idDistrito','codModular','modalidad','gestion','latitud','longitud'];
    private function Distrito(){
        return $this->belongsTo(Distrito::class); 
    }
}
