import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginLeft: '180px',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
    },
  },
}));
