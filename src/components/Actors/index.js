import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, CircularProgress, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import MovieList from 'components/MovieList';
import {
  useGetMoviesByActorIdQuery,
  useGetActorProfileQuery,
} from '../../services/TMDB';
import ActorsStyles from './ActorsStyles';
import Pagination from '../Pagination/index';

function Actors() {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorProfileQuery(id);
  const { data: otherMoviesByActor } = useGetMoviesByActorIdQuery({ id, page });

  const classes = ActorsStyles();

  if (isFetching) {
    <Box display="flex" alignItems="center">
      <CircularProgress size="8rem" />
    </Box>;
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
        textAlign="center"
      >
        <Typography>
          Couldn&rsquo;t find actor&rsquo;s information, please go back.{' '}
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item className={classes.actorProfileContainer}>
        {' '}
        <Grid sm={12} lg={4} md={12} item>
          <img
            className={classes.profileImage}
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid item lg={7} sm={12} md={12} className={classes.actorInformation}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet.'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              color="primary"
              target="_blank"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>

        {otherMoviesByActor ? (
          <MovieList movies={otherMoviesByActor} numberOfMovies={12} />
        ) : (
          <Typography>
            Couldn&rsquo;t find other movies by {data?.name}{' '}
          </Typography>
        )}
      </Box>
      <Pagination
        currentPage={page}
        totalPages={otherMoviesByActor?.total_pages}
        setPage={setPage}
      />
    </Grid>
  );
}

export default Actors;
