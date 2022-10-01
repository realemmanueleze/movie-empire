import { ExitToApp } from '@mui/icons-material';
import { Typography, Box, Button } from '@mui/material';
import MovieList from 'components/MovieList';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetListQuery } from 'services/TMDB';

function logout() {
  localStorage.clear();

  window.location.href = '/';
}

function Profile() {
  //Get User from Redux Store
  const { user } = useSelector((state) => state.user);

  //Get List of Favorited Movies
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('sessionId'),
    page: 1,
  });

  // Get List of Watchlisted Movies
  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('sessionId'),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />{' '}
        </Button>
      </Box>
      {!favoriteMovies?.results.length && !watchlistMovies?.results.length ? (
        <Typography variant="h5">
          Add favorites or wachlist some movies to see them here
        </Typography>
      ) : (
        <Box>
          <Box marginBottom="30px">
            <Typography variant="h5" gutterButtom marginBottom="10px">
              Favorite Movies
            </Typography>
            <MovieList
              justifyContent="flex-start"
              movies={favoriteMovies}
              numberOfMovies={favoriteMovies?.results.length}
            />
          </Box>
          <Box margin="10px 0px">
            <Typography variant="h5" gutterButtom marginBottom="10px">
              Watchlist
            </Typography>
            <MovieList
              justifyContent="flex-start"
              movies={watchlistMovies}
              numberOfMovies={watchlistMovies?.results.length}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Profile;
