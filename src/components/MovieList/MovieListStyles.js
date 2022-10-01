import { makeStyles } from '@mui/styles';

export default makeStyles((theme, justifyContent) => ({
  moviesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    justifyContent: { justifyContent: 'space-between' },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
