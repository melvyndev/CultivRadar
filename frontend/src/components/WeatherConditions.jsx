import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherConditions({ lat, lng }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);
        // Ajout du délai de 3 secondes avant de mettre à jour l'état
        setTimeout(() => {
          setWeather(response.data);
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);  // Arrête le chargement en cas d'erreur
      }
    };
    fetchWeather();
  }, [lat, lng]);

  if (loading) {
    return (
      <div className='transparent p-3'>
        <img width={200} src={require('../assets/images/loading.gif')} alt="chargement" />
      </div>
    );
  }

  return (
    <div className='transparent p-3'>
      <h2>Conditions Météorologiques</h2>
      <p><img width={40} src={require('../assets/images/temperature.gif')} alt="température" /> Température : {weather.main.temp}°C</p>
      <p><img width={40} src={require('../assets/images/humidity.gif')} alt="humidité" /> Humidité : {weather.main.humidity}%</p>
      <p><img width={40} src={require('../assets/images/clouds.gif')} alt="nuage" /> Conditions : {weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherConditions;
