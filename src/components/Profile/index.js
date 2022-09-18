import { ExitToApp } from '@mui/icons-material';
import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const favoriteMovies = [];
function logout() {
  localStorage.clear();

  window.location.href = '/';
}

function Profile() {
  const { user } = useSelector((state) => state.user);
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
      {!favoriteMovies.length ? (
        <Typography variant="h5">
          Add favorites or wachlist some movies to see them here
        </Typography>
      ) : (
        <Box>FAVORITE MOVIES</Box>
      )}
    </Box>
  );
}

export default Profile;
