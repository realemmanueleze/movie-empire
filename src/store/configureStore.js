import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from 'services/TMDB';
import genreOrCategoryReducer from 'features/genreOrCategory';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },
});

export default store;
