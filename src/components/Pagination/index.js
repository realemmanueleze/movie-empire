import React from 'react';
import { Typography, Button } from '@mui/material';
import PaginationStyles from './PaginationStyles';

// eslint-disable-next-line react/prop-types
function Pagination({ currentPage, totalPages, setPage }) {
  const classes = PaginationStyles();

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (totalPages === 1) {
    return null;
  }
  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        onClick={handlePrev}
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
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
