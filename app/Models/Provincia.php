<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    private function Departamento(){
        return $this->belongsTo(Departamento::class); 
    }
    private function Distrito(){
        return $this->hasMany(Distrito::class); 
    }
}
