import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  profileImage: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
      height: '350px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 30px auto',
      width: '100%',
      height: '350px',
    },
  },

  actorInformation: {
    display: 'flex',
    flexDirection: 'column !important',
    justifyContent: 'center',
  },
}));
