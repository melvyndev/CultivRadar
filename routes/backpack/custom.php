<?php

use Illuminate\Support\Facades\Route;

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
    Route::crud('plant-crud-controller', 'PlantCrudControllerCrudController');
    Route::crud('weather-forecast-crud-controller', 'WeatherForecastCrudControllerCrudController');
    Route::crud('user-crud-controller', 'UserCrudControllerCrudController');
    Route::crud('location-crud-controller', 'LocationCrudControllerCrudController');
    Route::crud('user', 'UserCrudController');
}); // this should be the absolute last line of this file