// components/HumidityChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HumidityChart = ({ data }) => {
  const humidityChartRef = useRef();

  useEffect(() => {
    const svgHumidity = d3.select(humidityChartRef.current);
    svgHumidity.selectAll("*").remove();

    const marginHumidity = { top: 20, right: 30, bottom: 40, left: 40 };
    const widthHumidity = 800 - marginHumidity.left - marginHumidity.right;
    const heightHumidity = 400 - marginHumidity.top - marginHumidity.bottom;

    const weeks = data.map(d => d.week);
    const xHumidity = d3.scaleBand()
      .domain(weeks)
      .range([0, widthHumidity])
      .padding(0.1);

    const yHumidity = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.humidity)])
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
      .call(xAxisHumidity);

    barHumidity.append("g")
      .attr("class", "y-axis")
      .call(yAxisHumidity);

    barHumidity.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar neon-bar")
      .attr("x", d => xHumidity(d.week))
      .attr("y", d => yHumidity(d.humidity))
      .attr("width", xHumidity.bandwidth())
      .attr("height", d => heightHumidity - yHumidity(d.humidity))
      .attr("title", d => `${d.humidity}%`)
      .transition()
      .duration(1000)
      .attr("y", d => yHumidity(d.humidity))
      .attr("height", d => heightHumidity - yHumidity(d.humidity));
  }, [data]);

  return (
    <div>
      <h2>Histogramme taux d'Humidité</h2>
      <svg ref={humidityChartRef} width={800} height={400}></svg>
    </div>
  );
};

export default HumidityChart;
