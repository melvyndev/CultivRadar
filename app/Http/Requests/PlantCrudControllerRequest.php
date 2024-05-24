<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlantCrudControllerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // only allow updates if the user is logged in
        return backpack_auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            
            'scientific_name' => 'required|string|max:255',
            'common_name' => 'required|string|max:255',
            'family' => 'required|string|max:255',
            'growth_conditions' => 'required|string',
            'light_requirement' => 'required|string|max:100',
            'water_requirement' => 'required|string|max:100',
            'soil_requirement' => 'required|string|max:255',
            'soil_ph' => 'required|numeric',
            'temperature_min' => 'required|numeric',
            'temperature_max' => 'required|numeric',
            'humidity_min' => 'required|numeric',
            'humidity_max' => 'required|numeric',
            'description' => 'required|string',
            
           
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            //
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            //
        ];
    }
}
