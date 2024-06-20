import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import growthData from '../assets/json/growth.json';
// Import statements and initial component setup...

const RadarChart = ({ data }) => {
  const chartRef = useRef();
  const [dimensions, setDimensions] = useState({ width: window.innerWidth - 20, height: window.innerHeight - 20 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    /*eslint-disable-next-line*/
    const width = dimensions.width * 0.3;
    /*eslint-disable-next-line*/
    const height = dimensions.height * 0.7;
    /*eslint-disable-next-line*/
    const radius = Math.min(width, height) / 2 - 50;
    /*eslint-disable-next-line*/
    const levels = 5;
    /*eslint-disable-next-line*/
    const maxValue = 5;
    /*eslint-disable-next-line*/
    const angleSlice = (Math.PI * 2) / data.length;

    /*eslint-disable-next-line*/
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    d3.select(chartRef.current).selectAll("*").remove(); // Clear previous chart

    /*eslint-disable-next-line*/
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Add glow effect
    /*eslint-disable-next-line*/
    const defs = svg.append('defs');
    /*eslint-disable-next-line*/
    const filter = defs.append('filter').attr('id', 'glow');
    /*eslint-disable-next-line*/
    filter.append('feGaussianBlur').attr('stdDeviation', '3.5').attr('result', 'coloredBlur');
    /*eslint-disable-next-line*/
    const feMerge = filter.append('feMerge');
    /*eslint-disable-next-line*/
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    /*eslint-disable-next-line*/
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Draw the circular grid
    for (let i = 0; i < levels; i++) {
      /*eslint-disable-next-line*/
      const levelFactor = (i + 1) * radius / levels;
      /*eslint-disable-next-line*/
      svg.selectAll('.levels')
        .data([1])
        .enter()
        .append('circle')
        .attr('r', 0)
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-dasharray', '2,2')
        .style('opacity', 0.75)
        .transition()
        .duration(3000)
        .attr('r', levelFactor);
    }

    // Draw the axes
    data.forEach((d, i) => {
      /*eslint-disable-next-line*/
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 0)
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .style('opacity', 0.75)
        .transition()
        .duration(2000)
        .attr('x2', rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y2', rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2));

      /*eslint-disable-next-line*/
      svg.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', 'black')
        .style('font-family', 'Arial')
        .transition()
        .duration(2000)
        .attr('x', (rScale(maxValue * 1.1)) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y', (rScale(maxValue * 1.1)) * Math.sin(angleSlice * i - Math.PI / 2))
        .text(d.criteria);
    });

    // Draw the radar chart
    /*eslint-disable-next-line*/
    const radarLine = d3.lineRadial()
      .radius(d => rScale(d.value))
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    /*eslint-disable-next-line*/
    const radarPath = svg.append('path')
      .datum(data)
      .attr('d', radarLine)
      .style('fill', 'none')
      .style('stroke', 'rgb(0, 255, 26)')
      .style('stroke-width', 2)
      .style('filter', 'url(#glow)');

    /*eslint-disable-next-line*/
    const totalLength = radarPath.node().getTotalLength();

    /*eslint-disable-next-line*/
    radarPath
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Tooltip
    /*eslint-disable-next-line*/
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#f4f4f4')
      .style('padding', '5px 10px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '3px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Draw circles at data points and add tooltip event listeners
    /*eslint-disable-next-line*/
    svg.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('r', 4)
      .attr('cx', d => rScale(d.value) * Math.cos(angleSlice * data.indexOf(d) - Math.PI / 2))
      .attr('cy', d => rScale(d.value) * Math.sin(angleSlice * data.indexOf(d) - Math.PI / 2))
      .style('fill', 'rgb(0, 255, 26)')
      .style('stroke', 'black')
      .style('stroke-width', 1.5)
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', .9);
        tooltip.html(`${d.criteria}: ${d.value}`)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

  }, [data, dimensions]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg ref={chartRef} style={{ overflow: 'visible' }}></svg>
    </div>
  );
};

export default RadarChart;