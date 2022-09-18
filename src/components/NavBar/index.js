import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'features/auth';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
  Brightness3,
  Brightness5,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Sidebar from 'components/Sidebar/index';
import Search from 'components/Search';
import NavBarStyles from './NavBarStyles';
import { fetchToken, movieApi, createSessionId } from '../utils/index';

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = NavBarStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const token = localStorage.getItem('requestToken');
  const sessionIdFromLocalStrorage = localStorage.getItem('sessionId');
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    async function logInUser() {
      if (token) {
        if (sessionIdFromLocalStrorage) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionIdFromLocalStrorage}`
          );

          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    }
    logInUser();
  }, [token]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/:${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="profile"
                  src=""
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.drawerBackground}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            !isMobile && (
              <Drawer
                sx={{
                  width: '240px',
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: '240px',
                    boxSizing: 'border-box',
                  },
                }}
                variant="permanent"
                anchor="left"
                open
              >
                <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>
            )
          )}
        </nav>
      </div>
    </div>
  );
}

export default NavBar;

{
  /* <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} open>
  <Sidebar setMobileOpen={setMobileOpen} />
</Drawer>; */
}
