<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImsakiyahController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/provinsi', [ImsakiyahController::class, 'getProvinces']);
Route::post('/kabkota', [ImsakiyahController::class, 'getKabupaten']);
Route::post('/jadwal', [ImsakiyahController::class, 'getJadwal']);