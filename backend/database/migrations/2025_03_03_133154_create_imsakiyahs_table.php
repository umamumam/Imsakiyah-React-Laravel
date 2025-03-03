<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imsakiyahs', function (Blueprint $table) {
            $table->id();
            $table->string('provinsi');
            $table->string('kabkota');
            $table->date('tanggal');
            $table->time('imsak');
            $table->time('subuh');
            $table->time('dzuhur');
            $table->time('ashar');
            $table->time('maghrib');
            $table->time('isya');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imsakiyahs');
    }
};
