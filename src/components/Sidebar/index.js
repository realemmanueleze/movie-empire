/* eslint-disable react/prop-types */
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
import { useGetGenresQuery } from 'services/TMDB';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from 'features/currentGenreOrCategory';
import SidebarStyles from './SidebarStyles';
import { demoCategories } from './Data';
import genreIcons from '../../assets/genres';

const blueLogo = './images/blueLogo.png';
const redLogo = './images/redLogo.png';

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = SidebarStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  // Closes Mobile Menu When a New Genre/Category is Selected
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

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
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt={value}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data?.genres?.map(({ id, name }) => (
            <Link key={name} to="/" className={classes.links}>
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    alt={name}
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </div>
  );
}

export default Sidebar;
