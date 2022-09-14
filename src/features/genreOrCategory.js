import { createSlice } from '@reduxjs/toolkit';

const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreOrCategoryName: '',
    page: 1,
    searchQuerry: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreOrCategoryName = action.payload;
    },
  },
});

export const { selectGenreOrCategory } = genreOrCategory.actions;
export default genreOrCategory.reducer;
