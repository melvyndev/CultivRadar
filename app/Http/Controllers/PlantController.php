<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PlantController extends Controller
{
    public function index()
    {
        return Plant::all();
    }

    public function show($id)
    {
        return Plant::find($id);
    }

    public function search($term)
    {
        return Plant::where('scientific_name', 'like', '%' . $term . '%')
            ->orWhere('common_name', 'like', '%' . $term . '%')
            ->orWhere('family', 'like', '%' . $term . '%')
            ->get();

    }

    public function getPlantsByLocation($latitude, $longitude)
    {
        $apiKey = '3a6ee895a099497f0ac5d5fa99e903bb';

        $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'lat' => $latitude,
            'lon' => $longitude,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);

        if ($response->successful()) {
            $weatherData = $response->json();

            $currentTemperature = $weatherData['main']['temp'];
            $currentHumidity = $weatherData['main']['humidity'];

            $inWater = $this->isLocationInWater($latitude, $longitude);

            if ($inWater) {
                $plants = null;
            } else {
                $plants = Plant::where('temperature_min', '<=', $currentTemperature)
                    ->where('temperature_max', '>=', $currentTemperature)
                    ->where('humidity_min', '<=', $currentHumidity)
                    ->where('humidity_max', '>=', $currentHumidity)
                    ->get();
            }
        } else {
            $plants = null;
        }

        return response()->json($plants);
    }

    public function isLocationInWater($latitude, $longitude)
    {
        $url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=$latitude&lon=$longitude&zoom=10&addressdetails=1";

        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json();

            if (isset($data['address'])) {
                if (isset($data['address']['water'])) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        return null;
    }
}
