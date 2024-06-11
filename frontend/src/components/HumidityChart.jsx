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

    // Aggregating data by day
    const aggregatedData = d3.rollup(forecast, v => ({
      humidity: d3.mean(v, d => d.main.humidity)
    }), d => d3.timeDay.floor(new Date(d.dt_txt)));

    // Transforming aggregated data to an array
    const aggregatedArray = Array.from(aggregatedData, ([day, { humidity }]) => ({ day, humidity }));

    // Sort days
    aggregatedArray.sort((a, b) => new Date(a.day) - new Date(b.day));


    const svgHumidity = d3.select(humidityChartRef.current);
    svgHumidity.selectAll("*").remove();

    const marginHumidity = { top: 20, right: 30, bottom: 70, left: 40 };
    const widthHumidity = 800 - marginHumidity.left - marginHumidity.right;
    const heightHumidity = 400 - marginHumidity.top - marginHumidity.bottom;

    const xHumidity = d3.scaleBand()
      .domain(aggregatedArray.map(d => d3.timeFormat("%d/%m")(d.day)))
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
      .call(d3.axisLeft(yHumidity).tickFormat(d => `${d}%`));

    const barHumidity = svgHumidity.append("g")
      .attr("transform", `translate(${marginHumidity.left},${marginHumidity.top})`);

    barHumidity.append("g")
      .attr("class", "x-axis")
      .call(xAxisHumidity)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    barHumidity.append("g")
      .attr("class", "y-axis")
      .call(yAxisHumidity);

    const bars = barHumidity.selectAll(".bar")
      .data(aggregatedArray)
      .enter().append("rect")
      .attr("class", "bar neon-bar")
      .attr("x", d => xHumidity(d3.timeFormat("%d/%m")(d.day)))
      .attr("width", xHumidity.bandwidth())
      .attr("fill", "#69b3a2")
      .attr("y", yHumidity(0))
      .attr("height", 0);

    bars.transition()
      .duration(1500)
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
