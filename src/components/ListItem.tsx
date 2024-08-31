import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import LanIcon from '@mui/icons-material/Lan';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component='a' href='/'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Member'>
      <ListItemIcon>
        <PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="選手登録画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Board'>
      <ListItemIcon>
        <AppRegistrationIcon />
      </ListItemIcon>
      <ListItemText primary="試合登録画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Order'>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="オーダー入力画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Court'>
      <ListItemIcon>
        <SportsTennisIcon />
      </ListItemIcon>
      <ListItemText primary="コート状況画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Result'>
      <ListItemIcon>
        <LanIcon />
      </ListItemIcon>
      <ListItemText primary="試合結果記入画面" />
    </ListItemButton>
  </React.Fragment>
);
