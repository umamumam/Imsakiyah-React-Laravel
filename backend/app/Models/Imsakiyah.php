<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Imsakiyah extends Model
{
    use HasFactory;

    protected $table = 'imsakiyahs';

    protected $fillable = [
        'provinsi',
        'kabkota',
        'tanggal',
        'imsak',
        'subuh',
        'dzuhur',
        'ashar',
        'maghrib',
        'isya'
    ];
}
