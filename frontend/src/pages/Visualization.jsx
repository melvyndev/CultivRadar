import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';
import axios from 'axios';
import List from '../components/List';
import * as d3 from 'd3';
import RadarChart from '../components/RadarChart';
import PlantMap from '../components/PlantMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';

const Visualization = () => {
  // Récupération des paramètres d'URL
  const { lat, lng } = useParams();

  // Déclaration des états
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [plants, setPlants] = useState([]);
  const tempChartRef = useRef();
  const humidityChartRef = useRef();
  const plantingChartRef = useRef();

  // Effet pour charger les données
  useEffect(() => {
    // Fonction pour récupérer les données météo actuelles
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeather();

    // Fonction pour récupérer les prévisions météo
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);
        setForecast(response.data.list);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };
    fetchForecast();

    // Fonction pour récupérer les données sur les plantes
    axios.get(`http://127.0.0.1:8000/api/plants/${lat}/${lng}`)
      .then(response => {
        console.log('Plants data fetched:', response.data);
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error fetching plants data:', error);
      });
  }, [lat, lng]);

  // Effet pour créer les graphiques
  useEffect(() => {
    if (forecast.length > 0) {
      // Agréger les données par semaine
      const aggregatedData = d3.rollup(forecast, v => ({
        temp: d3.mean(v, d => d.main.temp),
        humidity: d3.mean(v, d => d.main.humidity)
      }), d => {
        const date = new Date(d.dt_txt);
        const week = date.toLocaleDateString('fr-FR', { week: 'short' }); // Format français
        return week;
      });
      // Transformer les données agrégées en tableau
      const aggregatedArray = Array.from(aggregatedData, ([week, { temp, humidity }]) => ({ week, temp, humidity }));

      // Température Chart
      const svgTemp = d3.select(tempChartRef.current);
      svgTemp.selectAll("*").remove();

      const marginTemp = { top: 20, right: 30, bottom: 40, left: 40 };
      const widthTemp = 800 - marginTemp.left - marginTemp.right;
      const heightTemp = 400 - marginTemp.top - marginTemp.bottom;

      const weeks = aggregatedArray.map(d => d.week);
      const xTemp = d3.scaleBand()
        .domain(weeks)
        .range([0, widthTemp])
        .padding(0.1);

      const yTemp = d3.scaleLinear()
        .domain([0, d3.max(aggregatedArray, d => d.temp)])
        .nice()
        .range([heightTemp, 0]);

      const xAxisTemp = g => g
        .attr("transform", `translate(0,${heightTemp})`)
        .call(d3.axisBottom(xTemp).tickFormat(d => `${d} - ${d+6}`)); // Format des semaines

      const yAxisTemp = g => g
        .call(d3.axisLeft(yTemp).tickFormat(d => `${d}°C`)); // Format de l'axe Y

      const barTemp = svgTemp.append("g")
        .attr("transform", `translate(${marginTemp.left},${marginTemp.top})`);

      barTemp.append("g")
        .attr("class", "x-axis")
        .call(xAxisTemp);

      barTemp.append("g")
        .attr("class", "y-axis")
        .call(yAxisTemp);

      barTemp.selectAll(".bar")
        .data(aggregatedArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xTemp(d.week))
        .attr("y", d => yTemp(d.temp))
        .attr("width", xTemp.bandwidth())
        .attr("height", d => heightTemp - yTemp(d.temp))
        .attr("fill", d => d.temp > 25 ? "red" : "steelblue"); // Change la couleur en rouge si la température est supérieure à 25°C
    }
  }, [forecast]);

  return (
    <main className="flex-shrink-0 bg-plant">
      <Nav />
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            {weather ? (
              <div className='transparent p-3'>
                <h2>Conditions Météorologiques</h2>
                <p><img width={35} src={require('../assets/images/temperature.gif')} alt="" /> Température : {weather.main.temp}°C</p>
                <p><img width={35} src={require('../assets/images/humidity.gif')} alt="" /> Humidité : {weather.main.humidity}%</p>
                <p><img width={35} src={require('../assets/images/clouds.gif')} alt="" /> Conditions : {weather.weather[0].description}</p>
              </div>
            ) : (
              <p>Chargement des données météo...</p>
            )}
          </div>
          <div className="col-12 col-md-6">
            <List plants={plants} />
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <div className='transparent'>
              <h2>Histogramme de Température</h2>
              <svg ref={tempChartRef} width={800} height={400}></svg>
            </div>
          </div>
          <div className="col-10">
            <div className='transparent'>
              <h2>Diagramme en Barres d'Humidité</h2>
              <svg ref={humidityChartRef} width={800} height={400}></svg>
            </div>
          </div>
          <div className="col-10">
            <div className='transparent'>
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
          <div className='transparent'>
            <h2>Graphique en Courbes de Périodes de Plantation</h2>
            <svg ref={plantingChartRef} width={800} height={400}></svg>
            </div>
          </div>
        
        </div>
      </div>
    </main>
  );
};

export default Visualization;
