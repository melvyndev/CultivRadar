import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 50; // Added padding for labels
    const levels = 5;
    const maxValue = 5;
    const angleSlice = (Math.PI * 2) / data.length;

    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Draw the circular grid
    for (let i = 0; i < levels; i++) {
      const levelFactor = (i + 1) * radius / levels;
      svg.selectAll('.levels')
        .data([1])
        .enter()
        .append('circle')
        .attr('r', levelFactor)
        .style('fill', 'none')
        .style('stroke', 'grey')
        .style('stroke-dasharray', '2,2');
    }

    // Draw the axes
    data.forEach((d, i) => {
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y2', rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
        .style('stroke', 'grey')
        .style('stroke-width', 1);

      svg.append('text')
        .attr('x', (rScale(maxValue * 1.1)) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y', (rScale(maxValue * 1.1)) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(d.criteria);
    });

    // Draw the radar chart
    const radarLine = d3.lineRadial()
      .radius(d => rScale(d.value))
      .angle((_, i) => i * angleSlice);

    svg.append('path')
      .datum(data)
      .attr('d', radarLine)
      .style('fill', 'none')
      .style('stroke', 'steelblue')
      .style('stroke-width', 2);

  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default RadarChart;
