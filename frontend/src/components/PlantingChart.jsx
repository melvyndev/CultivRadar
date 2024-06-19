import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { timeFormat, timeParse, timeFormatDefaultLocale } from 'd3-time-format';

const frenchLocale = {
  'dateTime': '%A, le %e %B %Y, %X',
  'date': '%d/%m/%Y',
  'time': '%H:%M:%S',
  'periods': ['AM', 'PM'],
  'days': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  'shortDays': ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  'months': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  'shortMonths': ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
};

timeFormatDefaultLocale(frenchLocale);

const PlantingChart = ({ plantingData }) => {
  const plantingChartRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load the JSON data based on the plantingData received
        const response = await import(`../assets/json/fruits/${formatPlantingData(plantingData)}.json`);
        setData(response.default.zones); // Assuming zones is the array of data in your JSON
      } catch (error) {
        console.error('Error fetching planting data:', error);
      }
    };

    fetchData();
  }, [plantingData]);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height || data.length === 0) return;

    const svg = d3.select(plantingChartRef.current);

    svg.selectAll('*').remove(); // Clear SVG before rendering

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const parseDate = timeParse('%Y-%m-%d');

    const xScale = d3.scaleTime()
      .domain([
        d3.min(data, d => parseDate(d.periode_plantation.début)),
        d3.max(data, d => parseDate(d.periode_plantation.fin))
      ])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.nom))
      .range([0, height])
      .padding(0.1);

    const xAxis = g => g
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%B')));

    const yAxis = g => g
      .call(d3.axisLeft(yScale));

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g')
      .attr('class', 'x-axis')
      .call(xAxis);

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    data.forEach(zone => {
      g.append('line')
        .attr('x1', xScale(parseDate(zone.periode_plantation.début)))
        .attr('y1', yScale(zone.nom) + yScale.bandwidth() / 2)
        .attr('x2', xScale(parseDate(zone.periode_plantation.fin)))
        .attr('y2', yScale(zone.nom) + yScale.bandwidth() / 2)
        .style('stroke', 'rgb(0, 255, 26)')
        .attr('stroke-width', 20)
        .on('mouseover', function(event, d) {
          tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);

          const offsetX = event.pageX;
          const offsetY = event.pageY;

          const debut = timeFormat('%d %B')(parseDate(zone.periode_plantation.début));
          const fin = timeFormat('%d %B')(parseDate(zone.periode_plantation.fin));

          tooltip.html(`<strong>${zone.nom}</strong><br/>
                       <strong>Pays:</strong> ${zone.pays.join(', ')}<br/>
                       <strong>Période de plantation:</strong><br/>
                       ${debut} - ${fin}`)
            .style('left', `${offsetX}px`)
            .style('top', `${offsetY - 50}px`);
        })
        .on('mouseout', function(d) {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });
    });

  }, [dimensions, data]);

  useEffect(() => {
    const handleResize = () => {
      const width = plantingChartRef.current.parentElement.offsetWidth;
      const height = width * 0.5;
      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function formatPlantingData(data) {
    return data.toLowerCase().replace(/ /g, '_');
  }

  return (
    <div className='p-3' style={{ width: '100%' }}>
      <h2>Diagramme de Périodes de Plantation par Zone</h2>
      <svg ref={plantingChartRef} width={dimensions.width} height={dimensions.height}></svg>
    </div>
  );
};

export default PlantingChart;
