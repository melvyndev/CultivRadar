// components/WeatherConditions.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';

const WeatherConditions = ({ weather }) => (
  <div className='transparent p-3'>
    <h2>Conditions Météorologiques</h2>
    <p><FontAwesomeIcon icon={faTemperatureLow} /> Température : {weather.main.temp}°C</p>
    <p><FontAwesomeIcon icon={faTint} /> Humidité : {weather.main.humidity}%</p>
    <p><FontAwesomeIcon icon={faCloud} /> Conditions : {weather.weather[0].description}</p>
  </div>
);

export default WeatherConditions;
