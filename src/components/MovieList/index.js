/* eslint-disable react/prop-types */
import React from 'react';
import { Grid } from '@mui/material';
import Movie from 'components/Movie';
import MovieListStyles from './MovieListStyles';

function MovieList({ movies, numberOfMovies, justifyContent }) {
  const classes = MovieListStyles(justifyContent);

  return (
    <Grid className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
