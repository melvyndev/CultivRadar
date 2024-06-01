import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

const List = ({ plants }) => {
  console.log('Plants received in List component:', plants); // Debug log

  return (
    <div>
      <h2>Plantes à Cultiver</h2>
      <Box className="pt-3" sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
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
                <ListItemText primary={plants[index].common_name} />
              </ListItemButton>
            </ListItem>
          )}
        </FixedSizeList>
      </Box>
    </div>
  );
}

export default List;
