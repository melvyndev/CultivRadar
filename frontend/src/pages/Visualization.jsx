import React, { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';
import axios from 'axios';
import List from '../components/List';

const Visualization = () => {
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
        const response = await axios.get('YOUR_WEATHER_API_ENDPOINT');
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  // Fetch plants data
  useEffect(() => {
    axios.get('http://localhost:8000/api/plants')
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
    <main className="flex-shrink-0">
      <Nav />
      <Header />
      <div className="container py-4">
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
