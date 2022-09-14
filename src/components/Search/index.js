import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import SearchStyles from './SearchStyles';
import { searchMovie } from '../../features/currentGenreOrCategory';

function Search() {
  const [query, setQuery] = useState('');
  const classes = SearchStyles();
  const dispatch = useDispatch();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };
  const { searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  console.log(searchQuery);

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Search;
