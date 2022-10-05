/* eslint-disable react/prop-types */
import React from 'react';
import { Grid } from '@mui/material';
import Movie from 'components/Movie';
import MovieListStyles from './MovieListStyles';

function MovieList({ movies, numberOfMovies, excludeFirst }) {
  const classes = MovieListStyles();
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid className={classes.moviesContainer}>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
