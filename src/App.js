import React, { useRef, useContext } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAlan from 'components/Alan';
import { ColorModeContext } from 'utils/ToggleColorMode';
import { Helmet } from 'react-helmet';
import {
  Actors,
  Movies,
  MovieInformation,
  NavBar,
  Profile,
} from './components/index';
import useStyles from './styles';

function App() {
  const { mode } = useContext(ColorModeContext);
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();

  return (
    <Router>
      <Helmet>
        <meta
          name="theme-color"
          content={mode === 'light' ? '#1975D1' : '#272727'}
        />
        <meta
          name="msapplication-navbutton-color"
          content={mode === 'light' ? '#1975D1' : '#272727'}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={mode === 'light' ? '#1975D1' : '#272727'}
        />
      </Helmet>
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
