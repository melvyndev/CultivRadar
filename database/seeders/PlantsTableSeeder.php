<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Mapping des exigences et tolérances
        $lightRequirement = [
            'Plein soleil' => 5,
            'Ensoleillé' => 4,
            'Partiellement ensoleillé' => 3,
            'Lumière filtrée' => 2,
            'Ombre légère' => 1
        ];

        $waterRequirement = [
            'Très élevé' => 5,
            'Élevé' => 4,
            'Modéré' => 3,
            'Faible' => 2,
            'Très faible' => 1
        ];

        $temperatureTolerance = [
            'Tropical' => 5,
            'Tempéré' => 4,
            'Froid' => 2,
            'Très froid' => 1
        ];

        $soilRequirement = [
            'Argileux' => 3,
            'Sableux' => 2,
            'Limoneux' => 3,
            'Tourbeux' => 4,
            'Salin' => 1
        ];

        // Insertion des données dans la table 'plants'
        DB::table('plants')->insert([
            [
                'scientific_name' => 'Opuntia ficus-indica',
                'common_name' => 'Figuier de Barbarie',
                'family' => 'Cactaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Plein soleil',
                'water_requirement' => 'Très faible',
                'soil_requirement' => 'Caillouteux',
                'soil_ph' => 6.0,
                'temperature_min' => -10.0,
                'temperature_max' => 50.0,
                'humidity_min' => 10.0,
                'humidity_max' => 40.0,
                'description' => 'Le figuier de Barbarie est une plante succulente de la famille des cactacées, connue pour ses fruits comestibles appelés figues de Barbarie.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'scientific_name' => 'Phoenix dactylifera',
                'common_name' => 'Palmier Dattier',
                'family' => 'Arecaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Plein soleil',
                'water_requirement' => 'Modéré',
                'soil_requirement' => 'Sablonneux',
                'soil_ph' => 6.5,
                'temperature_min' => 5.0,
                'temperature_max' => 50.0,
                'humidity_min' => 20.0,
                'humidity_max' => 60.0,
                'description' => 'Le palmier dattier est un arbre de la famille des arécacées, connu pour ses fruits sucrés, les dattes.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'scientific_name' => 'Mangifera indica',
                'common_name' => 'Manguier',
                'family' => 'Anacardiaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Plein soleil',
                'water_requirement' => 'Modéré',
                'soil_requirement' => 'Léger, bien drainé, légèrement acide à neutre',
                'soil_ph' => 5.5,
                'temperature_min' => 5.0,
                'temperature_max' => 45.0,
                'humidity_min' => 40.0,
                'humidity_max' => 80.0,
                'description' => 'Le manguier est un arbre tropical de la famille des Anacardiacées, connu pour ses fruits délicieux et sucrés, les mangues.',
                'created_at' => now(),
                'updated_at' => now(),
            ],            
            [
                'scientific_name' => 'Citrullus lanatus',
                'common_name' => 'Pastèque',
                'family' => 'Cucurbitaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Plein soleil',
                'water_requirement' => 'Modéré',
                'soil_requirement' => 'Limoneux',
                'soil_ph' => 6.0,
                'temperature_min' => 20.0,
                'temperature_max' => 40.0,
                'humidity_min' => 30.0,
                'humidity_max' => 60.0,
                'description' => 'La pastèque est une plante de la famille des cucurbitacées, connue pour son gros fruit sucré et juteux.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'scientific_name' => 'Malus domestica',
                'common_name' => 'Pomme',
                'family' => 'Rosaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Plein soleil',
                'water_requirement' => 'Modéré',
                'soil_requirement' => 'Limoneux',
                'soil_ph' => 6.0,
                'temperature_min' => -2.0,
                'temperature_max' => 24.0,
                'humidity_min' => 40.0,
                'humidity_max' => 70.0,
                'description' => 'Le pommier est un arbre caduc de la famille des rosacées, connu pour son fruit sucré, la pomme.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'scientific_name' => 'Pyrus communis',
                'common_name' => 'Poire',
                'family' => 'Rosaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Partiellement ensoleillé',
                'water_requirement' => 'Modéré',
                'soil_requirement' => 'Limoneux',
                'soil_ph' => 6.0,
                'temperature_min' => -4.0,
                'temperature_max' => 24.0,
                'humidity_min' => 40.0,
                'humidity_max' => 70.0,
                'description' => 'La poire est un fruit sucré, étroit en haut et large en bas. Elle est riche en fibres et en antioxydants.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'scientific_name' => 'Ananas comosus',
                'common_name' => 'Ananas',
                'family' => 'Bromeliaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Plein soleil',
                'water_requirement' => 'Modéré',
                'soil_requirement' => 'Limoneux',
                'soil_ph' => 5.0,
                'temperature_min' => 16.0,
                'temperature_max' => 32.0,
                'humidity_min' => 50.0,
                'humidity_max' => 70.0,
                'description' => 'L\'ananas est une plante tropicale avec un fruit comestible multiple constitué de baies coalescentes, également appelées ananas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'scientific_name' => 'Litchi chinensis',
                'common_name' => 'Litchi',
                'family' => 'Sapindaceae',
                'image' => 'default_image_url.jpg',
                'growth_conditions' => 'Sol bien drainé',
                'light_requirement' => 'Plein soleil',
                'water_requirement' => 'Modéré',
                'soil_requirement' => 'Limoneux',
                'soil_ph' => 5.0,
                'temperature_min' => 20.0,
                'temperature_max' => 32.0,
                'humidity_min' => 50.0,
                'humidity_max' => 70.0,
                'description' => 'Le litchi est un fruit tropical de la famille des Sapindacées, apprécié pour sa chair juteuse et sucrée.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
