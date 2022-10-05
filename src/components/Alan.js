import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { fetchToken } from 'utils';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {
  selectGenreOrCategory,
  searchMovie,
} from 'features/currentGenreOrCategory';
import { ColorModeContext } from '../utils/ToggleColorMode';

function useAlan() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMode } = useContext(ColorModeContext);

  useEffect(() => {
    alanBtn({
      key: '4bcadde2fd507b6030b1b4d0aaa6e88c2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            // navigate('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top')
              ? 'top_rated'
              : genreOrCategory;
            // navigate('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          window.location.href = '/';
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
}

export default useAlan;
