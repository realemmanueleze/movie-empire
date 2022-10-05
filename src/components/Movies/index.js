import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import MovieList from 'components/MovieList';
import Pagination from 'components/Pagination';
import FeaturedMovie from 'components/FeaturedMovie';
import { useGetMoviesQuery } from '../../services/TMDB';
import MoviesStyles from './MoviesStyles';

function Movies() {
  const [page, setPage] = useState(1);
  const classes = MoviesStyles();
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 26 : 21;

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
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
}

export default Movies;
