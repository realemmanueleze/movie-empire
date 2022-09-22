import React from 'react';
import { Typography, Button } from '@mui/material';
import PaginationStyles from './PaginationStyles';

function Pagination() {
  const classes = PaginationStyles();
  const currentPage = 1;
  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
