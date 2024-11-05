<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    private function Provincia(){
        return $this->hasMany(Provincia::class); 
    }
}
