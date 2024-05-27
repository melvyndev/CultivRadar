<?php
namespace App\Http\Controllers;

use App\Models\Plant;
use Illuminate\Http\Request;
use App\Models\Todo;

class PlantController extends Controller
{
    public function index()
    {
        return  Plant::all();
    }
}
