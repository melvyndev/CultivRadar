<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Front\PlantController;

// Route::apiResource('plant', PlantController::class);
Route::get('api/plants', [PlantController::class, 'index']);
