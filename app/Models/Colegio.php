<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{
    public $timestamps=false;
    protected $fillable = ['nombrecolegio','Distrito_idDistrito'];
}
