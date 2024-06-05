import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';
import WeatherConditions from '../components/WeatherConditions';
import axios from 'axios';
import List from '../components/List';
import * as d3 from 'd3';
import RadarChart from '../components/RadarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';
import TemperatureChart from '../components/TemperatureChart';
import HumidityChart from '../components/HumidityChart';
import PlantingChart from '../components/PlantingChart';

const Visualization = () => {
  const { lat, lng } = useParams();
  const [forecast, setForecast] = useState([]);
  const [plantingData, setPlantingData] = useState([]);
  const tempChartRef = useRef();
  const humidityChartRef = useRef();
  const plantingChartRef = useRef();

  useEffect(() => {
  
    // Fetch planting periods data
    axios.get(`http://127.0.0.1:8000/api/planting/${lat}/${lng}`)
      .then(response => {
        console.log('Planting periods data fetched:', response.data);
        setPlantingData(response.data);
      })
      .catch(error => {
        console.error('Error fetching planting periods data:', error);
      });

    const examplePlantingData = [
      { culture: "Tomato", start: "2023-03-01", end: "2023-05-31" },
      { culture: "Lettuce", start: "2023-02-01", end: "2023-04-30" },
      { culture: "Carrot", start: "2023-04-01", end: "2023-06-30" },
      { culture: "Pepper", start: "2023-05-01", end: "2023-07-31" },
      { culture: "Cucumber", start: "2023-06-01", end: "2023-08-31" }
    ];
    setPlantingData(examplePlantingData);
  }, [lat, lng]);

 
  return (
    <main className="flex-shrink-0 bg-plant">
      <Nav />
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
          <WeatherConditions lat={lat}  lng={lng}  />

          </div>
          <div className="col-12 col-md-6">
            <List  lat={lat}  lng={lng} />
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <TemperatureChart  lat={lat}  lng={lng} />
          </div>
          <div className="col-10">
              <HumidityChart  lat={lat}  lng={lng} />
          </div>
          <div className="col-10">
            <div className=''>
              <h2>Diagramme Radar des Exigences de Croissance</h2>
              <RadarChart data={[
                { criteria: "Light", value: 5 },
                { criteria: "Water", value: 3 },
                { criteria: "Soil", value: 4 },
                { criteria: "pH", value: 2 },
                { criteria: "Temperature", value: 4 }
              ]} />
            </div>
          </div>
          <div className="col-10">
            <PlantingChart data={plantingData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Visualization;
