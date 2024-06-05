// components/TemperatureChart.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const TemperatureChart = ({ lat, lng }) => {
  const tempChartRef = useRef();
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
  }, [lat, lng]); // Dependency on lat and lng

  useEffect(() => {
    if (forecast.length === 0) return;

    // Aggregating data by week
    const aggregatedData = d3.rollup(forecast, v => ({
      temp: d3.mean(v, d => d.main.temp)
    }), d => {
      const date = new Date(d.dt_txt);
      const week = d3.timeWeek(date);
      return week;
    });

    // Transforming aggregated data to an array
    const aggregatedArray = Array.from(aggregatedData, ([week, { temp }]) => ({ week, temp }));

    console.log('Aggregated Data:', aggregatedArray); // Log the aggregated data

    const svgTemp = d3.select(tempChartRef.current);
    svgTemp.selectAll("*").remove();

    const marginTemp = { top: 20, right: 30, bottom: 40, left: 40 };
    const widthTemp = 800 - marginTemp.left - marginTemp.right;
    const heightTemp = 400 - marginTemp.top - marginTemp.bottom;

    const weeks = aggregatedArray.map(d => d3.timeFormat("%Y-%W")(d.week));
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
      .call(d3.axisLeft(yTemp).tickFormat(d => `${d}°C`));

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
      .attr("class", "bar neon-bar")
      .attr("x", d => xTemp(d3.timeFormat("%Y-%W")(d.week)))
      .attr("y", d => yTemp(d.temp))
      .attr("width", xTemp.bandwidth())
      .attr("height", d => heightTemp - yTemp(d.temp))
      .attr("title", d => `${d.temp}°C`)
      .transition()
      .duration(1000)
      .attr("y", d => yTemp(d.temp))
      .attr("height", d => heightTemp - yTemp(d.temp));
  }, [forecast]); // Dependency on forecast

  return (
    <div>
      <h2>Histogramme de Température</h2>
      <svg ref={tempChartRef} width={800} height={400}></svg>
    </div>
  );
};

export default TemperatureChart;
