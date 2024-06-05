// components/PlantingChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PlantingChart = ({ data }) => {
  const plantingChartRef = useRef();

  useEffect(() => {
    const svgPlanting = d3.select(plantingChartRef.current);
    svgPlanting.selectAll("*").remove();

    const marginPlanting = { top: 20, right: 30, bottom: 40, left: 40 };
    const widthPlanting = 800 - marginPlanting.left - marginPlanting.right;
    const heightPlanting = 400 - marginPlanting.top - marginPlanting.bottom;

    const cultures = [...new Set(data.map(d => d.culture))];

    const xPlanting = d3.scaleTime()
      .domain([new Date(2023, 0, 1), new Date(2023, 11, 31)])
      .range([0, widthPlanting]);

    const yPlanting = d3.scaleBand()
      .domain(cultures)
      .range([0, heightPlanting])
      .padding(0.1);

    const xAxisPlanting = g => g
      .attr("transform", `translate(0,${heightPlanting})`)
      .call(d3.axisBottom(xPlanting).tickFormat(d3.timeFormat("%B")));

    const yAxisPlanting = g => g
      .call(d3.axisLeft(yPlanting));

    const plantingG = svgPlanting.append("g")
      .attr("transform", `translate(${marginPlanting.left},${marginPlanting.top})`);

    plantingG.append("g")
      .attr("class", "x-axis")
      .call(xAxisPlanting);

    plantingG.append("g")
      .attr("class", "y-axis")
      .call(yAxisPlanting);

    cultures.forEach(culture => {
      const cultureData = data.filter(d => d.culture === culture);
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
  }, [data]);

  return (
    <div className='transparent'>
      <h2>Graphique en Courbes de Périodes de Plantation</h2>
      <svg ref={plantingChartRef} width={800} height={400}></svg>
    </div>
  );
};

export default PlantingChart;
