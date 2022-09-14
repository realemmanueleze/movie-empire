import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import SearchStyles from './SearchStyles';

function Search() {
  const [querry, setQuerry] = useState('');
  const classes = SearchStyles();
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={() => {}}
        value={querry}
        onChange={(e) => setQuerry(e.target.value)}
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
