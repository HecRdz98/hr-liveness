<?php

use HR\Liveness\Http\Controllers\LivenessController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web'])->prefix('liveness')->name('liveness.')->group(function () {
    Route::post('/verify', [LivenessController::class, 'verify'])->name('verify');
    Route::get('/photos',  [LivenessController::class, 'photos'])->name('photos');
});
