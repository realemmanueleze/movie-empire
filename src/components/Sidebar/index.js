import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import SidebarStyles from './SidebarStyles';
import { demoCategories, demoGenres } from './Data';

const blueLogo = './images/blueLogo.png';
const redLogo = './images/redLogo.png';

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = SidebarStyles();
  return (
    <div className={classes.container}>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="M-Zone logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} to="/" className={classes.links}>
            <ListItem>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt={value}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoGenres.map(({ label, value }) => (
          <Link key={value} to="/" className={classes.links}>
            <ListItem>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt={value}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;
