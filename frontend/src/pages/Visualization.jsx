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
      console.log(response.data);
    })
    .catch(error => {
    });
  }, []);




  // Filtrage des prévisions en fonction de la plage de température
 
  // Création du graphique avec D3.js
  useEffect(() => {
    if (filteredForecast.length > 0) {
      const svg = d3.select(chartRef.current);
      svg.selectAll('*').remove(); // Nettoyer le SVG avant de redessiner

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(filteredForecast.map(d => d.dt_txt))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(filteredForecast, d => d.main.temp)])
        .nice()
        .range([height, 0]);

      const xAxis = g => g
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d %H:%M")));

      const yAxis = g => g
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text('Température (°C)'));

      const svgContent = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      svgContent.append("g")
        .selectAll("rect")
        .data(filteredForecast)
        .join("rect")
        .attr("x", d => x(d.dt_txt))
        .attr("y", d => y(d.main.temp))
        .attr("height", d => y(0) - y(d.main.temp))
        .attr("width", x.bandwidth())
        .attr("fill", "steelblue");

      svgContent.append("g")
        .call(xAxis);

      svgContent.append("g")
        .call(yAxis);
    }
  }, [filteredForecast]);

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
           <Card  body={<div>Custom Body Content</div>}>
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
