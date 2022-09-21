import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Actors,
  Movies,
  MovieInformation,
  NavBar,
  Profile,
} from './components/index';
import useStyles from './styles';

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <NavBar />
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes>
            <Route path="/" exact="true" element={<Movies />} />
            <Route
              path="/movie/:id"
              exact="true"
              element={<MovieInformation />}
            />
            <Route path="/actors/:id" exact="true" element={<Actors />} />
            <Route path="/profile/:id" exact="true" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
