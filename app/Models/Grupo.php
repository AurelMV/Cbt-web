<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $table = 'Grupos';
    protected $primaryKey = 'id';
    protected $fillable = [''];

    public function ciclos() {
        return $this->belongsTo(Ciclo::class);
    }
}
