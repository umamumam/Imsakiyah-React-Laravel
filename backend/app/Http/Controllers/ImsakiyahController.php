<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ImsakiyahController extends Controller
{
    // Ambil daftar provinsi
    public function getProvinces()
    {
        $response = Http::get('https://equran.id/api/v2/imsakiyah/provinsi');
        return response()->json($response->json());
    }

    // Ambil daftar kabupaten/kota berdasarkan provinsi
    public function getKabupaten(Request $request)
    {
        $response = Http::post('https://equran.id/api/v2/imsakiyah/kabkota', [
            'provinsi' => $request->provinsi
        ]);
        return response()->json($response->json());
    }

    // Ambil jadwal imsakiyah berdasarkan provinsi dan kabupaten/kota
    public function getJadwal(Request $request)
    {
        $response = Http::post('https://equran.id/api/v2/imsakiyah', [
            'provinsi' => $request->provinsi,
            'kabkota'  => $request->kabkota
        ]);
        return response()->json($response->json());
    }
}
