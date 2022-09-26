import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  profileImage: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 30px auto',
      width: '100%',
      maxHeight: '350px',
    },
  },

  actorProfileContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },

  actorInformation: {
    display: 'flex',
    flexDirection: 'column !important',
    justifyContent: 'center',
  },
}));
