<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ImsakiyahService
{
    protected $apiUrl = 'https://equran.id/api/v2/imsakiyah';

    public function getProvinces()
    {
        return Http::get("{$this->apiUrl}/provinsi")->json();
    }

    public function getCities($provinsi)
    {
        return Http::post("{$this->apiUrl}/kabkota", ['provinsi' => $provinsi])->json();
    }

    public function getJadwal($provinsi, $kabkota)
    {
        return Http::post("{$this->apiUrl}", [
            'provinsi' => $provinsi,
            'kabkota' => $kabkota,
        ])->json();
    }
}
