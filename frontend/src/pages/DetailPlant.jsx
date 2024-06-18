import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header";
import Nav from "../components/Nav";
import PlantingChart from '../components/PlantingChart';
import RadarChart from '../components/RadarChart';

function DetailPlant() {
    const [plant, setPlant] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/plants/${id}`)
            .then(response => {
                console.log('Plant data fetched:', response.data);
                setPlant(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching plant data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <Header />
            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="plant-details">
                            <img
                                src={`http://127.0.0.1:8000/${plant.image}`} 
                                onError={(e) => { e.target.src = require('../assets/images/gardening.png'); }} 
                                alt={plant.common_name}
                                className="plant-image"
                            />
                            <div className="plant-info mt-3">
                                <p><strong>Nom commun:</strong> {plant.common_name}</p>
                                <p><strong>Nom scientifique:</strong> {plant.scientific_name}</p>
                                <p><strong>Famille:</strong> {plant.family}</p>
                                <p><strong>Conditions de croissance:</strong> {plant.growth_conditions}</p>
                                <p><strong>Exigence en lumière:</strong> {plant.light_requirement}</p>
                                <p><strong>Exigence en eau:</strong> {plant.water_requirement}</p>
                                <p><strong>Exigence en sol:</strong> {plant.soil_requirement}</p>
                                <p><strong>pH du sol:</strong> {plant.soil_ph}</p>
                                <p><strong>Température minimale:</strong> {plant.temperature_min}°C</p>
                                <p><strong>Température maximale:</strong> {plant.temperature_max}°C</p>
                                <p><strong>Humidité minimale:</strong> {plant.humidity_min}%</p>
                                <p><strong>Humidité maximale:</strong> {plant.humidity_max}%</p>
                                <p><strong>Description:</strong> {plant.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <h2>Diagramme Radar des Exigences de Croissance</h2>
                        <div  className="radar-chart">
                        <RadarChart className="radar-chart" data={[
                            { criteria: "Lumière", value: 5 },
                            { criteria: "Eau", value: 3 },
                            { criteria: "Sol", value: plant.soil_ph },
                            { criteria: "pH", value: 2 },
                            { criteria: "Température", value: 4 }
                        ]} />
                        </div>
                       
                    </div>
                    <div className="col-12 mt-4">
                        <PlantingChart lat={-20.98539601183345} lng={55.64559675115465} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPlant;
