import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from 'services/TMDB';
import genreOrCategoryReducer from 'features/currentGenreOrCategory';
import userReducer from 'features/auth';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
});

export default store;
