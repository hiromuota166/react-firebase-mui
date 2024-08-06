import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CasinoIcon from '@mui/icons-material/Casino';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component='a' href='/'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component='a' href='/member'>
      <ListItemIcon>
        <PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="Member" />
    </ListItemButton>
    <ListItemButton component='a' href='/Board'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Board" />
    </ListItemButton>
    <ListItemButton component='a' href='/Game'>
      <ListItemIcon>
        <CasinoIcon />
      </ListItemIcon>
      <ListItemText primary="Game" />
    </ListItemButton>
    <ListItemButton component='a' href='/GPT'>
      <ListItemIcon>
        <SmartToyIcon />
      </ListItemIcon>
      <ListItemText primary="GPT" />
    </ListItemButton>
  </React.Fragment>
);
