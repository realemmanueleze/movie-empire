import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '../index';
import MoviesStyles from './MoviesStyles';

function Movies() {
  const classes = MoviesStyles();
  const { data, error, isFetching } = useGetMoviesQuery();
  // console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center">
        <Typography variant="h4">
          No movie here matches that name
          <br />
          please search for something else
        </Typography>
      </Box>
    );
  }

  if (error) {
    return 'An error has occured';
  }

  return (
    <div className={classes.container}>
      <MovieList movies={data} />
    </div>
  );
}

export default Movies;
