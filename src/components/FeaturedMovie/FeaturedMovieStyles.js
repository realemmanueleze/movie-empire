import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  featuredCardContainer: {
    marginBottom: '20px',
    display: 'flex',
    justityContent: 'center',
    height: '490px',
    textDecoration: 'none',
  },

  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  cardRoot: {
    position: 'relative',
  },

  cardMedia: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.575)',
    backgroundBlendMode: 'darken',
  },

  cardContent: {
    width: '40%',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  cardContentRoot: {
    position: 'relative',
  },
}));
