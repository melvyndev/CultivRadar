<?php
namespace App\Http\Controllers;

use App\Models\Plant;
use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Http;

class PlantController extends Controller
{
    public function index()
    {
        return  Plant::all();
    }

    public function show($id)
    {
        return Plant::find($id);
    }


    function getPlantsByLocation($latitude, $longitude) {
        // Appelez l'API météorologique pour obtenir les conditions météorologiques actuelles
        $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'lat' => $latitude,
            'lon' => $longitude,
            'appid' => '3a6ee895a099497f0ac5d5fa99e903bb',
            'units' => 'metric',
        ]);
    
        // Extraire les données de température et d'humidité du résultat
        $currentTemperature = $response['main']['temp'];
        $currentHumidity = $response['main']['humidity'];
       $inWater=$this->isLocationInWater($latitude, $longitude);
       if($inWater){
        $plants=null;
       }else
       {     
           // Filtrer les plantes en fonction des conditions météorologiques et du type de plante (fruit)
           $plants = Plant::where('temperature_min', '<=', $currentTemperature)
           ->where('temperature_max', '>=', $currentTemperature)
           ->where('humidity_min', '<=', $currentHumidity)
           ->where('humidity_max', '>=', $currentHumidity)
           ->where('soil_ph', '>=',2) // Condition pour le pH du sol (remplacer 6.0 par la valeur souhaitée)
           ->get();

       }
     
                       return response()->json($plants);
    }

    function isLocationInWater($latitude, $longitude) {
        $url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=$latitude&lon=$longitude&zoom=10&addressdetails=1";
    
        $response = Http::get($url);
    
        if ($response->successful()) {
            $data = $response->json();
    
            if (isset($data['address'])) {
                // Vérifiez si la réponse contient des informations sur le type de lieu
                if (isset($data['address']['water'])) {
                    return true; // La position est dans l'eau
                } else {
                    return false; // La position est sur la terre
                }
            }
        }
    
        return null; // Impossible de déterminer, peut-être en raison d'une erreur de réseau ou d'une réponse non valide
    }
    
    




}
