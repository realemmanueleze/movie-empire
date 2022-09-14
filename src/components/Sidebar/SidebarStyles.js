import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    width: '240px',
    position: 'relative',
  },
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5% 0',
  },
  image: {
    width: '70%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genremages: {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
  },
}));