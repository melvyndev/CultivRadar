// components/HumidityChart.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const HumidityChart = ({ lat, lng }) => {
  const humidityChartRef = useRef();
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=3a6ee895a099497f0ac5d5fa99e903bb&units=metric`);
        setForecast(response.data.list);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };
    fetchForecast();
  }, [lat, lng]);

  useEffect(() => {
    if (forecast.length === 0) return;

    // Map forecast data to the format required for the chart
    const data = forecast.map(entry => ({
      date: new Date(entry.dt_txt),
      humidity: entry.main.humidity
    }));

    const svgHumidity = d3.select(humidityChartRef.current);
    svgHumidity.selectAll("*").remove();

    const marginHumidity = { top: 20, right: 30, bottom: 40, left: 40 };
    const widthHumidity = 800 - marginHumidity.left - marginHumidity.right;
    const heightHumidity = 400 - marginHumidity.top - marginHumidity.bottom;

    const xHumidity = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, widthHumidity]);

    const yHumidity = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.humidity)])
      .nice()
      .range([heightHumidity, 0]);

    const xAxisHumidity = g => g
      .attr("transform", `translate(0,${heightHumidity})`)
      .call(d3.axisBottom(xHumidity).tickFormat(d3.timeFormat("%b %d")));

    const yAxisHumidity = g => g
      .call(d3.axisLeft(yHumidity).tickFormat(d => `${d}%`));

    const barHumidity = svgHumidity.append("g")
      .attr("transform", `translate(${marginHumidity.left},${marginHumidity.top})`);

    barHumidity.append("g")
      .attr("class", "x-axis")
      .call(xAxisHumidity);

    barHumidity.append("g")
      .attr("class", "y-axis")
      .call(yAxisHumidity);

    barHumidity.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar neon-bar")
      .attr("x", d => xHumidity(d.date))
      .attr("y", d => yHumidity(d.humidity))
      .attr("width", xHumidity.bandwidth ? xHumidity.bandwidth() : 10) // adjust the width for time scale
      .attr("height", d => heightHumidity - yHumidity(d.humidity))
      .attr("title", d => `${d.humidity}%`)
      .transition()
      .duration(1000)
      .attr("y", d => yHumidity(d.humidity))
      .attr("height", d => heightHumidity - yHumidity(d.humidity));
  }, [forecast]);

  return (
    <div>
      <h2>Histogramme taux d'Humidité</h2>
      <svg ref={humidityChartRef} width={800} height={400}></svg>
    </div>
  );
};

export default HumidityChart;
