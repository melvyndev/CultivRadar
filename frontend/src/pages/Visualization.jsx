import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';
import axios from 'axios';
import List from '../components/List';
import * as d3 from 'd3';
import RadarChart from '../components/RadarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';

const Visualization = () => {
  const { lat, lng } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [plants, setPlants] = useState([]);
  const [plantingData, setPlantingData] = useState([]);
  const tempChartRef = useRef();
  const humidityChartRef = useRef();
  const plantingChartRef = useRef();

  useEffect(() => {
    // Fetch current weather data
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeather();

    // Fetch forecast data
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);
        setForecast(response.data.list);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };
    fetchForecast();

    // Fetch plants data
    axios.get(`http://127.0.0.1:8000/api/plants/${lat}/${lng}`)
      .then(response => {
        console.log('Plants data fetched:', response.data);
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error fetching plants data:', error);
      });

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

  useEffect(() => {
    if (forecast.length > 0) {
      // Agréger les données par semaine
      const aggregatedData = d3.rollup(forecast, v => ({
        temp: d3.mean(v, d => d.main.temp),
        humidity: d3.mean(v, d => d.main.humidity)
      }), d => {
        const date = new Date(d.dt_txt);
        const week = date.toLocaleDateString('en-US', { week: 'short' });
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
        .call(d3.axisBottom(xTemp));

      const yAxisTemp = g => g
        .call(d3.axisLeft(yTemp));

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
        .attr("fill", "red"); // Change la couleur en rouge si la température est supérieure à 25°C

      // Humidity Chart
      const svgHumidity = d3.select(humidityChartRef.current);
      svgHumidity.selectAll("*").remove();

      const marginHumidity = { top: 20, right: 30, bottom: 40, left: 40 };
      const widthHumidity = 800 - marginHumidity.left - marginHumidity.right;
      const heightHumidity = 400 - marginHumidity.top - marginHumidity.bottom;

      const xHumidity = d3.scaleBand()
        .domain(weeks)
        .range([0, widthHumidity])
        .padding(0.1);

      const yHumidity = d3.scaleLinear()
        .domain([0, d3.max(aggregatedArray, d => d.humidity)])
        .nice()
        .range([heightHumidity, 0]);

      const xAxisHumidity = g => g
        .attr("transform", `translate(0,${heightHumidity})`)
        .call(d3.axisBottom(xHumidity));

      const yAxisHumidity = g => g
        .call(d3.axisLeft(yHumidity));

      const barHumidity = svgHumidity.append("g")
        .attr("transform", `translate(${marginHumidity.left},${marginHumidity.top})`);

      barHumidity.append("g")
        .attr("class", "x-axis")
        .call(xAxisHumidity);

      barHumidity.append("g")
        .attr("class", "y-axis")
        .call(yAxisHumidity);

      barHumidity.selectAll(".bar")
        .data(aggregatedArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xHumidity(d.week))
        .attr("y", d => yHumidity(d.humidity))
        .attr("width", xHumidity.bandwidth())
        .attr("height", d => heightHumidity - yHumidity(d.humidity))
        .attr("fill", "steelblue"); // Change la couleur en rouge si la température est supérieure à 25°C
    }
  }, [forecast]);

  useEffect(() => {
    if (plantingData.length > 0) {
      // Log the planting data to check its format and content
      console.log('Planting Data:', plantingData);

      // Create the planting periods chart
      const svgPlanting = d3.select(plantingChartRef.current);
      svgPlanting.selectAll("*").remove();

      const marginPlanting = { top: 20, right: 30, bottom: 40, left: 40 };
      const widthPlanting = 800 - marginPlanting.left - marginPlanting.right;
      const heightPlanting = 400 - marginPlanting.top - marginPlanting.bottom;

      // Extract unique cultures
      const cultures = [...new Set(plantingData.map(d => d.culture))];

      // Define scales
      const xPlanting = d3.scaleTime()
        .domain([new Date(2023, 0, 1), new Date(2023, 11, 31)])  // January to December
        .range([0, widthPlanting]);

      const yPlanting = d3.scaleBand()
        .domain(cultures)
        .range([0, heightPlanting])
        .padding(0.1);

      // Define axes
      const xAxisPlanting = g => g
        .attr("transform", `translate(0,${heightPlanting})`)
        .call(d3.axisBottom(xPlanting).tickFormat(d3.timeFormat("%B")));

      const yAxisPlanting = g => g
        .call(d3.axisLeft(yPlanting));

      // Create the main SVG group
      const plantingG = svgPlanting.append("g")
        .attr("transform", `translate(${marginPlanting.left},${marginPlanting.top})`);

      // Add the axes
      plantingG.append("g")
        .attr("class", "x-axis")
        .call(xAxisPlanting);

      plantingG.append("g")
        .attr("class", "y-axis")
        .call(yAxisPlanting);

      // Add the lines
      cultures.forEach(culture => {
        const cultureData = plantingData.filter(d => d.culture === culture);
        cultureData.forEach(period => {
          plantingG.append("line")
            .attr("x1", xPlanting(new Date(period.start)))
            .attr("x2", xPlanting(new Date(period.end)))
            .attr("y1", yPlanting(culture) + yPlanting.bandwidth() / 2)
            .attr("y2", yPlanting(culture) + yPlanting.bandwidth() / 2)
            .attr("stroke", "green")
            .attr("stroke-width", 7);
        });
      });
    }
  }, [plantingData]);

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
            <div className=''>
              <h2>Histogramme de Température</h2>
              <svg ref={tempChartRef} width={800} height={400}></svg>
            </div>
          </div>
          <div className="col-10">
            <div className=''>
              <h2>Histogramme taux d'Humidité</h2>
              <svg ref={humidityChartRef} width={800} height={400}></svg>
            </div>
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
