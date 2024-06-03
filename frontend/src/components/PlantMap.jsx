import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const PlantMap = ({ plants }) => {
  const mapRef = useRef();

  useEffect(() => {
    const svg = d3.select(mapRef.current);
    svg.selectAll('*').remove();

    const width = 1100;
    const height = 700;

    const projection = d3.geoMercator()
      .scale((width + 1) / 2 / Math.PI)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.json('https://d3js.org/world-110m.v1.json').then(world => {
      svg.append('path')
        .datum(topojson.feature(world, world.objects.countries))
        .attr('d', path)
        .attr('class', 'country')
        .style('fill', '#cccccc')
        .style('stroke', '#ffffff');

      plants.forEach(plant => {
        svg.append('circle')
          .attr('class', 'marker')
          .attr('r', 5)
          .attr('cx', projection([plant.longitude, plant.latitude])[0])
          .attr('cy', projection([plant.longitude, plant.latitude])[1])
          .style('fill', 'red')
          .append('title')
          .text(`Plant: ${plant.name}, Location: ${plant.location}`);
      });
    });
  }, [plants]);

  return <svg ref={mapRef} width={1100} height={700}></svg>;
};

export default PlantMap;
