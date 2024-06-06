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
        // Clé d'API OpenWeatherMap
        $apiKey = '3a6ee895a099497f0ac5d5fa99e903bb'; // Remplacez 'votre_clé_api' par votre propre clé API
    
        // Appelez l'API météorologique pour obtenir les conditions météorologiques actuelles
        $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'lat' => $latitude,
            'lon' => $longitude,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);
    
        // Si la requête est réussie
        if ($response->successful()) {
            $weatherData = $response->json();
    
            // Extraire les données de température et d'humidité du résultat
            $currentTemperature = $weatherData['main']['temp'];
            $currentHumidity = $weatherData['main']['humidity'];
    
            // Vérifier si l'emplacement se trouve dans l'eau
            $inWater = $this->isLocationInWater($latitude, $longitude);
    
            // Si l'emplacement est dans l'eau, aucune plante n'est adaptée
            if ($inWater) {
                $plants = null;
            } else {
                // Filtrer les plantes en fonction des conditions météorologiques actuelles et du type de plante (fruit)
                $plants = Plant::where('temperature_min', '<=', $currentTemperature)
                    ->where('temperature_max', '>=', $currentTemperature)
                    ->where('humidity_min', '<=', $currentHumidity)
                    ->where('humidity_max', '>=', $currentHumidity)
                    ->get();
            }
        } else {
            // En cas d'échec de la requête météorologique
            $plants = null;
        }
    
        // Retourner la réponse JSON avec les plantes filtrées
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
