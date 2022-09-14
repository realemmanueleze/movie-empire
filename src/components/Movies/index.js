import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import MovieList from 'components/MovieList';
import { useGetMoviesQuery } from '../../services/TMDB';
import MoviesStyles from './MoviesStyles';

function Movies() {
  const [page, setPage] = useState(1);
  const classes = MoviesStyles();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
  });
  console.log(data);

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
