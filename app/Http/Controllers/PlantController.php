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

    public function getPlantsByLocation($latitude, $longitude, $averageTemperature, $averageHumidity )
    {
      

            $inWater = $this->isLocationInWater($latitude, $longitude);

            if ($inWater) {
                $plants = null;
            } else {
                $plants = Plant::where('temperature_min', '<=', $averageTemperature)
                    ->where('temperature_max', '>=', $averageTemperature)
                    ->where('humidity_min', '<=', $averageHumidity)
                    ->where('humidity_max', '>=', $averageHumidity)
                    ->get();
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
