import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SmartToyIcon from '@mui/icons-material/SmartToy';

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
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="試合登録画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Order'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="オーダー入力画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Court'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="コート状況画面" />
    </ListItemButton>
    <ListItemButton component='a' href='/Result'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="試合結果記入画面" />
    </ListItemButton>
  </React.Fragment>
);
