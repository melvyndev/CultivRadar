import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

// Function to fetch and calculate average temperature and humidity
const fetchAverageClimateData = async (latitude, longitude) => {
  const year = 2023;
  const start_date = `${year}-01-01`;
  const end_date = `${year}-12-31`;
  const url = "https://archive-api.open-meteo.com/v1/archive";
  
  const params = {
    latitude: latitude,
    longitude: longitude,
    start_date: start_date,
    end_date: end_date,
    hourly: ["temperature_2m", "relative_humidity_2m"]
  };

  try {
    const response = await axios.get(url, { params });
    const hourly = response.data.hourly;
    const temperatures = hourly.temperature_2m;
    const humidities = hourly.relative_humidity_2m;

    const sumTemp = temperatures.reduce((acc, temp) => acc + temp, 0);
    const averageTemperature = sumTemp / temperatures.length;

    const sumHumidity = humidities.reduce((acc, humidity) => acc + humidity, 0);
    const averageHumidity = sumHumidity / humidities.length;

    return { averageTemperature, averageHumidity };
  } catch (error) {
    console.error('Error fetching climate data:', error);
    return { averageTemperature: null, averageHumidity: null };
  }
};

const List = ({ lat, lng }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageTemperature, setAverageTemperature] = useState(null);
  const [averageHumidity, setAverageHumidity] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const { averageTemperature, averageHumidity } = await fetchAverageClimateData(lat, lng);
        const response = await axios.get(`http://127.0.0.1:8000/api/plants/${lat}/${lng}/${averageTemperature}/${averageHumidity}`);
        setPlants(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching plants data:', error);
      }
    };


    fetchPlants();
  }, [lat, lng]);

  if (loading) {
    return (
      <div className='transparent p-3'>
        <img width={200} src={require('../assets/images/loading.gif')} alt="chargement" />
      </div>
    );
  }

  return (
    <div>
      <Box className="transparent" sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
        <h2>Plantes à Cultiver</h2>
        {averageTemperature !== null && averageHumidity !== null && (
          <div>
            <h3>Température Moyenne de l'Année Dernière: {averageTemperature.toFixed(2)}°C</h3>
            <h3>Humidité Moyenne de l'Année Dernière: {averageHumidity.toFixed(2)}%</h3>
          </div>
        )}
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={plants.length}
          overscanCount={5}
        >
          {({ index, style }) => (
            <ListItem style={style} key={index} component="div" disablePadding>
              <ListItemButton>
                <Link to={`/detail-plant/${plants[index].id}`} state={{ plant: plants[index] }} style={{ textDecoration: 'none', width: '100%' }}>
                  <Badge bg={"light"} text={"success"} style={{ width: '100%' }}>
                    <ListItemText primary={`${plants[index].scientific_name} - ${plants[index].common_name}`} />
                  </Badge>
                </Link>
              </ListItemButton>
            </ListItem>
          )}
        </FixedSizeList>
      </Box>
    </div>
  );
}

export default List;
