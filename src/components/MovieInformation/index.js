/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  useGetMovieQuery,
  useGetListQuery,
  useGetMovieRecommendationQuery,
} from 'services/TMDB';
import MovieList from 'components/MovieList';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import MovieInformationStyles from './MovieInformationStyles';
import genreIcons from '../../assets/genres';

function MovieInformation() {
  // Get User from Redux Store (user slice)
  const { user } = useSelector((state) => state.user);

  //Toggle Movie Trailer Open/Close
  const [trailerModalIsOpen, setTrailerModalIsOpen] = useState(false);

  //Get Current Movie Id
  const { id } = useParams();

  // Get Current Movie
  const { data, isFetching, error } = useGetMovieQuery({ id });

  // Get Movie Recommendations
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetMovieRecommendationQuery({ list: '/recommendations', movie_id: id });

  //Get List of Favorited Movies
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('sessionId'),
    page: 1,
  });

  // Get List of Watchlisted Movies
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('sessionId'),
    page: 1,
  });

  const classes = MovieInformationStyles();
  const dispatch = useDispatch();

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  // Adds Movie To Favorite
  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('sessionId')}`,
      {
        media_type: 'movie',
        movie_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  // Adds Movie To Watchlist
  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('sessionId')}`,
      {
        media_type: 'movie',
        movie_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size="8rem" />
    </Box>;
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong, please go back </Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item lg={7}>
        <Grid container direction="column">
          <Typography variant="h3" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split('-')[0]})
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Rating readOnly value={data?.vote_average / 2} />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginLeft: '10px' }}
              >
                {Math.round(data?.vote_average * 10) / 10} / 10
              </Typography>
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime}min | Language: {data?.spoken_languages[0].name}
            </Typography>
          </Grid>
          <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre) => (
              <Link
                key={genre.name}
                className={classes.links}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  alt={genre.name}
                  className={classes.genreImages}
                  height={30}
                />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
            Overview
          </Typography>
          <Typography style={{ marginBottom: '2rem' }}>
            {data?.overview}
          </Typography>
          <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
            Top Cast
          </Typography>
          <Grid item container spacing={2}>
            {data &&
              data.credits?.cast
                ?.map(
                  (character, i) =>
                    character.profile_path && (
                      <Grid
                        key={i}
                        item
                        xs={4}
                        md={2}
                        component={Link}
                        to={`/actors/${character.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt={character.name}
                          className={classes.castImage}
                        />
                        <Typography color="textPrimary">
                          {character.name}
                        </Typography>
                        <Typography color="textSecondary">
                          {character.character.split('/')[0]}
                        </Typography>
                      </Grid>
                    )
                )
                .splice(0, 6)}
          </Grid>
          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data?.homepage}
                    endIcon={<Language />}
                  >
                    website
                  </Button>
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                  <Button
                    onClick={() => setTrailerModalIsOpen(true)}
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                      isMovieFavorited ? (
                        <FavoriteBorderOutlined />
                      ) : (
                        <Favorite />
                      )
                    }
                  >
                    {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                  </Button>
                  <Button
                    onClick={addToWatchlist}
                    endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                  >
                    Watchlist
                  </Button>
                  <Button
                    endIcon={<ArrowBack />}
                    sx={{ borderColor: 'primary.main' }}
                  >
                    <Typography
                      component={Link}
                      variant="subtitle2"
                      color="inherit"
                      to="/"
                      style={{ textDecoration: 'none' }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          'Sorry, there are no movie recommendations at the moment'
        )}
      </Box>
      {data?.videos?.results?.length > 0 && (
        <Modal
          closeAfterTransition
          className={classes.modal}
          open={trailerModalIsOpen}
          onClose={() => setTrailerModalIsOpen(false)}
        >
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        </Modal>
      )}
    </Grid>
  );
}

export default MovieInformation;
