import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import Header from '../components/Header';
import axios from 'axios';
import List from '../components/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';


const Visualization = () => {
  const { lat, lng } = useParams();

  const [weather, setWeather] = useState(null);
  const [plants, setPlants] = useState([]);
  const [filteredForecast, setFilteredForecast] = useState([]);
  const [minTemp, setMinTemp] = useState(-10); // Default min temperature range
  const [maxTemp, setMaxTemp] = useState(40);  // Default max temperature range
  const chartRef = useRef();

  // Fetch weather data for a default location
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=20.884362559255447&lon=20.884362559255447&appid=3a6ee895a099497f0ac5d5fa99e903bb');
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  // Fetch plants data
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/plants/${lat}/${lng}`)
      .then(response => {
        console.log('Plants data fetched:', response.data); // Debug log
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error fetching plants data:', error);
      });
  }, []);

  // Filter weather forecast based on temperature range
  useEffect(() => {
    if (weather && weather.forecast) {
      const filtered = weather.forecast.filter(forecast => 
        forecast.temp >= minTemp && forecast.temp <= maxTemp
      );
      setFilteredForecast(filtered);
    }
  }, [weather, minTemp, maxTemp]);

  return (
<main className="flex-shrink-0 bg-plant">
      <Nav />
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Conditions Météorologiques</h2>
            {weather ? (
             <div>
            <p><FontAwesomeIcon icon={faTemperatureLow} /> Température : {weather.main.temp}°C</p>
            <p><FontAwesomeIcon icon={faTint} /> Humidité : {weather.main.humidity}%</p>
            <p><FontAwesomeIcon icon={faCloud} /> Conditions : {weather.weather[0].description}</p>
              </div>
            ) : (
                <p>Chargement des données météo...</p>
            )}
          </div>
          <div className="col-md-6">
            <List plants={plants} />
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Visualization;
