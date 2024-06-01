<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlantController;

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.

Route::group([
    'prefix' => config('backpack.base.route_prefix', 'admin'),
    'middleware' => array_merge(
        (array) config('backpack.base.web_middleware', 'web'),
        (array) config('backpack.base.middleware_key', 'admin')
    ),
    'namespace' => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    Route::crud('plant', 'PlantController');
    Route::crud('weather-forecast-crud-controller', 'WeatherForecastController');
    Route::crud('user-crud-controller', 'UserController');
    Route::crud('location-crud-controller', 'LocationController');
    Route::crud('user', 'UserCrudController');
}); // this should be the absolute last line of this file


// Route::get('plants', [PlantController::class, 'index']);
Route::apiResource('api/plants', PlantController::class);
Route::get('api/plants/{id}', [PlantController::class, 'show']);
Route::get('api/plants/{latitude}/{longitude}', [PlantController::class, 'getPlantsByLocation']);

