import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

const List = ({ lat,lng }) => {

  const [plants, setPlants] = useState([]);
  useEffect(() => {
    const fetchPlants = async () => {
    
    // Fetch plants data
    axios.get(`http://127.0.0.1:8000/api/plants/${lat}/${lng}`)
      .then(response => {
        console.log('Plants data fetched:', response.data);
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error fetching plants data:', error);
      });
    };
    fetchPlants();  }, [plants]);
  return (
    <div>
      <Box className="transparent" sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
        <h2>Plantes à Cultiver</h2>
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
                  <Badge bg={"light"}  text={"success"} style={{ width: '100%' }}>
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
