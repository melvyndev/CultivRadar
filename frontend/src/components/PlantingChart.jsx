import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const PlantingChart = ({ lat, lng }) => {
  const plantingChartRef = useRef();
  const [plantingData, setPlantingData] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const svgStyle = {
    overflowX: 'auto',
  };
  
  useEffect(() => {
    // Récupération des données sur les périodes de plantation
    axios.get(`http://127.0.0.1:8000/api/planting/${lat}/${lng}`)
      .then(response => {
        setPlantingData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données sur les périodes de plantation:', error);
        // Utilisation de données d'exemple en cas d'erreur
        const exempleDonneesPlantation = [
          { culture: "Tomate", début: "2023-03-01", fin: "2023-05-31" },
          { culture: "Laitue", début: "2023-02-01", fin: "2023-04-30" },
          { culture: "Carotte", début: "2023-04-01", fin: "2023-06-30" },
          { culture: "Poivron", début: "2023-05-01", fin: "2023-07-31" },
          { culture: "Concombre", début: "2023-06-01", fin: "2023-08-31" }
        ];
        setPlantingData(exempleDonneesPlantation);
      });
  }, [lat, lng]);

  useEffect(() => {
    const handleResize = () => {
      const width = plantingChartRef.current.parentElement.offsetWidth;
      const height = width * 0.5; // Adjust height based on width for responsiveness
      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (plantingData.length === 0) return;

    const svgPlantation = d3.select(plantingChartRef.current);
    svgPlantation.selectAll("*").remove();

    const margePlantation = { haut: 20, droit: 30, bas: 40, gauche: 40 };
    const largeurPlantation = dimensions.width - margePlantation.gauche - margePlantation.droit;
    const hauteurPlantation = dimensions.height - margePlantation.haut - margePlantation.bas;

    const cultures = [...new Set(plantingData.map(d => d.culture))];

    const xPlantation = d3.scaleTime()
      .domain([new Date(2023, 0, 1), new Date(2023, 11, 31)])
      .range([0, largeurPlantation]);

    const yPlantation = d3.scaleBand()
      .domain(cultures)
      .range([0, hauteurPlantation])
      .padding(0.1);

    const axeXPlantation = g => g
      .attr("transform", `translate(0,${hauteurPlantation})`)
      .call(d3.axisBottom(xPlantation).tickFormat(date => date.toLocaleDateString('fr-FR', { month: 'long' })));

    const axeYPlantation = g => g
      .call(d3.axisLeft(yPlantation));

    const plantationG = svgPlantation.append("g")
      .attr("transform", `translate(${margePlantation.gauche},${margePlantation.haut})`);

    plantationG.append("g")
      .attr("class", "axe-x")
      .attr("fill", "#69b3a2")
      .call(axeXPlantation);

    plantationG.append("g")
      .attr("class", "axe-y")
      .attr("fill", "#69b3a2")
      .call(axeYPlantation);

    cultures.forEach(culture => {
      const donnéesCulture = plantingData.filter(d => d.culture === culture);
      donnéesCulture.forEach(période => {
        const ligne = plantationG.append("line")
          .attr("x1", xPlantation(new Date(période.début)))
          .attr("x2", xPlantation(new Date(période.début))) // Commence avec x2 égal à x1 pour l'animation
          .attr("y1", yPlantation(culture) + yPlantation.bandwidth() / 2)
          .attr("y2", yPlantation(culture) + yPlantation.bandwidth() / 2)
          .attr("stroke", "rgb(0, 255, 26)")
          .attr("stroke-width", 7);

        ligne.transition()
          .duration(1000)
          .attr("x2", xPlantation(new Date(période.fin))); // Anime jusqu'à la position finale de x2
      });
    });
  }, [plantingData, dimensions]);

  return (
    <div className='p-3' style={{ width: '100%' }}>
      <h2>Graphique en Courbes de Périodes de Plantation</h2>
      <svg ref={plantingChartRef} width={dimensions.width} height={dimensions.height}></svg>
    </div>
  );
};

export default PlantingChart;
