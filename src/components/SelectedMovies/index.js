/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import Movie from 'components/Movie';
import SelectedMoviesStyles from './SelectedMoviesStyles';

function SelectedMovies({ movies, numberOfMovies }) {
  const classes = SelectedMoviesStyles();
  return (
    <Grid className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default SelectedMovies;
