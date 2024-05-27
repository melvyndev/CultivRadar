import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Nav from '../components/Nav';
import Header from '../components/Header';
import axios from 'axios';
import Card from '../components/CardComponent';
const Visualization = () => {
  const [weather, setWeather] = useState(null);
  const [plants, setPlants] = useState([]);
  const [filteredForecast, setFilteredForecast] = useState([]);
  const [minTemp, setMinTemp] = useState(-10); // Plage de température minimale par défaut
  const [maxTemp, setMaxTemp] = useState(40);  // Plage de température maximale par défaut
  const chartRef = useRef();

  // Récupération des données météorologiques pour une position par défaut
 
  // Récupération des prévisions météorologiques et des plantes à cultiver
  useEffect(() => {
    axios.get('http://localhost:8000/api/plants')
    .then(response => {
      setPlants(response.data);
    })
    .catch(error => {
    });
  }, []);




  // Filtrage des prévisions en fonction de la plage de température
 

  return (
    <main className="flex-shrink-0">
      <Nav />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>Conditions Météorologiques</h2>
            {weather ? (
              <div>
                <p>Température : {weather.main.temp}°C</p>
                <p>Humidité : {weather.main.humidity}%</p>
                <p>Conditions : {weather.weather[0].description}</p>
              </div>
            ) : (
              <p>Chargement des données météo...</p>
            )}
          </div>
          <div className="col-md-6">
            <h2>Plantes à Cultiver</h2>
          <Card  body={<div>{plants.map((plant,index) =>
         <div>
            <li>{plant.common_name}</li>
            <li><img src={plant.image} alt="" /></li>

          </div>
)}</div>}>
           </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2>Prévisions Météorologiques</h2>
            <div>
              <label>
                Température Minimale: 
                <input
                  type="number"
                  value={minTemp}
                  onChange={(e) => setMinTemp(Number(e.target.value))}
                />
              </label>
              <label>
                Température Maximale: 
                <input
                  type="number"
                  value={maxTemp}
                  onChange={(e) => setMaxTemp(Number(e.target.value))}
                />
              </label>
            </div>
            <svg ref={chartRef} width="800" height="400"></svg>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Visualization;
