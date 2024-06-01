<?php

use Illuminate\Support\Facades\Route;
Route::get('{reactRoutes}', function () {
    return view('welcome');})->where('reactRoutes', '^((?!api).)*$');