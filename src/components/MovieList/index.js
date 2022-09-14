/* eslint-disable react/prop-types */
import React from 'react';
import { Grid } from '@mui/material';
import Movie from 'components/Movie';
import MovieListStyles from './MovieListStyles';

function MovieList({ movies }) {
  const classes = MovieListStyles();

  return (
    <Grid className={classes.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
