import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAlan from 'components/Alan';
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
  const alanBtnContainer = useRef();
  useAlan();

  return (
    <Router>
      <div className={classes.root}>
        <NavBar />
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes>
            {['/', '/approved'].map((path) => (
              <Route key={path} path={path} exact="true" element={<Movies />} />
            ))}
            <Route
              path="/movie/:id"
              exact="true"
              element={<MovieInformation />}
            />
            <Route path="/actors/:id" exact="true" element={<Actors />} />
            <Route path="/profile/:id" exact="true" element={<Profile />} />
          </Routes>
        </main>
        <div ref={alanBtnContainer} />
      </div>
    </Router>
  );
}

export default App;
