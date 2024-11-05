<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use NunoMaduro\Collision\Provider;

class Distrito extends Model
{
    
    private function Provincia(){
        return $this->belongsTo(Provincia::class); 
    }
    private function Colegio(){
        return $this->hasMany(Colegio::class); 
    }

}

