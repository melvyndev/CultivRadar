import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weatherData from "../assets/json/weather.json";
import ClimateData from "../services/ClimateData.js";

function WeatherConditions({ lat, lng }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageTemperature, setAverageTemperature] = useState(null);
  const [averageHumidity, setAverageHumidity] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);

        // Simulate a delay of 3 seconds before updating the state
        setTimeout(() => {
          setWeather(response.data);
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);  // Stop loading in case of error
      }
    };

    const fetchAverageClimateData = async () => {
      const climateData = new ClimateData();
      const data = await climateData.fetchAverageClimateData(lat, lng);
      setAverageTemperature(data.averageTemperature);
      setAverageHumidity(data.averageHumidity);
    };

    fetchWeather();
    fetchAverageClimateData();
  }, [lat, lng]);

  if (loading) {
    return (
      <div className='transparent p-3'>
        <img width={200} src={require('../assets/images/loading.gif')} alt="loading" />
      </div>
    );
  }

  return (
    <div className='transparent p-3 text-start'>
      <h2>Conditions Météorologiques</h2>
      <h4>D'aujourd'hui :</h4>
      <p><img width={40} src={require('../assets/images/temperature.gif')} alt="température" /> Température : {weather.main.temp}°C</p>
      <p><img width={40} src={require('../assets/images/humidity.gif')} alt="humidité" /> Humidité : {weather.main.humidity}%</p>
      <p><img width={40} src={require('../assets/images/clouds.gif')} alt="nuage" /> Conditions : {weatherData.weatherTraduction[weather.weather[0].description]?.description_fr || 'Description non disponible'}</p>
      <h4>Moyenne :</h4>
      <p><img width={40} src={require('../assets/images/temperature.gif')} alt="température" /> Température : {averageTemperature !== null ? averageTemperature.toFixed(1) : 'N/A'}°C</p>
      <p><img width={40} src={require('../assets/images/humidity.gif')} alt="humidité" /> Humidité : {averageHumidity !== null ? averageHumidity.toFixed(1) : 'N/A'}%</p>
    </div>
  );
}

export default WeatherConditions;
