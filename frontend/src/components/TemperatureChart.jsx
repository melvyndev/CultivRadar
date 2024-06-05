// components/TemperatureChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TemperatureChart = ({ data }) => {
  const tempChartRef = useRef();

  useEffect(() => {
    const svgTemp = d3.select(tempChartRef.current);
    svgTemp.selectAll("*").remove();

    const marginTemp = { top: 20, right: 30, bottom: 40, left: 40 };
    const widthTemp = 800 - marginTemp.left - marginTemp.right;
    const heightTemp = 400 - marginTemp.top - marginTemp.bottom;

    const weeks = data.map(d => d.week);
    const xTemp = d3.scaleBand()
      .domain(weeks)
      .range([0, widthTemp])
      .padding(0.1);

    const yTemp = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.temp)])
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
      .data(data)
      .enter().append("rect")
      .attr("class", "bar neon-bar")
      .attr("x", d => xTemp(d.week))
      .attr("y", d => yTemp(d.temp))
      .attr("width", xTemp.bandwidth())
      .attr("height", d => heightTemp - yTemp(d.temp))
      .attr("title", d => `${d.temp}°C`)
      .transition()
      .duration(1000)
      .attr("y", d => yTemp(d.temp))
      .attr("height", d => heightTemp - yTemp(d.temp));
  }, [data]);

  return (
    <div>
      <h2>Histogramme de Température</h2>
      <svg ref={tempChartRef} width={800} height={400}></svg>
    </div>
  );
};

export default TemperatureChart;
