import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function WeatherConditions ({ lat,lng }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeather();  }, [weather]);

  
  if (!weather) {
    return <p>Weather data is loading...</p>;
  }

  return (
    <div className='transparent p-3'>
      <h2>Conditions Météorologiques</h2>
      <p><FontAwesomeIcon icon={faTemperatureLow} /> Température : {weather.main.temp}°C</p>
      <p><FontAwesomeIcon icon={faTint} /> Humidité : {weather.main.humidity}%</p>
      <p><FontAwesomeIcon icon={faCloud} /> Conditions : {weather.weather[0].description}</p>
    </div>  
  );
} 

export default WeatherConditions;
