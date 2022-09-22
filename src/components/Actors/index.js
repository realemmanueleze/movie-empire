import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, CircularProgress, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import MovieList from 'components/MovieList';
import {
  useGetMoviesByActorIdQuery,
  useGetActorProfileQuery,
} from '../../services/TMDB';
import ActorsStyles from './ActorsStyles';

function Actors() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorProfileQuery(id);
  const page = 1;
  const { data: otherMoviesByActor } = useGetMoviesByActorIdQuery(id, page);

  console.log(otherMoviesByActor);

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
      <Grid item>
        {' '}
        <Grid item sm={12} lg={5} xl={4}>
          <img
            className={classes.profileImage}
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} className={classes.actorInformation}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet.'}
          </Typography>
        </Grid>
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
    </Grid>
  );
}

export default Actors;
