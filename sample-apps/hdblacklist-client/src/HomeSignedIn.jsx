import BodygraphSelectorMenu from './widgets/BodygraphSelectorMenu';
import BodygraphsIndexScreen from './screens/BodygraphsIndexScreen';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import DashboardLandingScreen from './screens/DashboardLandingScreen';
import Divider from '@mui/material/Divider';
import HDBlacklistLogo from "./assets/hd-blacklist-logo.png";
import HomeSignedInListItems from './HomeSignedInListItems';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import NewBodygraphScreen from './screens/NewBodygraphScreen';
import QuartersAndGodheadsScreen from './screens/QuartersAndGodheadsScreen';
import React from 'react';
import {Route} from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { styled } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <br/><br/><br/><br/><br/> 
      {'Copyright © '}
      <Link color="inherit" href="https://www.hdblacklist.com/">
        www.hdblacklist.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function DashboardContent( props ) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  function getUser() {
    return props.user;
  }
  
  return (
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              sx={{
                width: 250,
              }}
              alt="HD Blacklist"
              src={HDBlacklistLogo}
              />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
           <List>{HomeSignedInListItems()}</List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.white
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Divider />
            <Typography variant="caption" color="text.secondary" align="center" {...props}>
            Logged in as <u>{props.user.username}</u> / {props.user.id}&nbsp;&nbsp; 
                {/* <Link to='/logout' onClick={props.logout}>(log out)</Link> */}
            </Typography>
            <Divider />
            {/* <BodygraphSelectorMenu /> */}
            <Divider />
                <Route
                  exact path='/'
                  render={props => (
                    <DashboardLandingScreen {...props} />
                  )}
                />
                <Route
                  exact path='/bodygraphs/new'
                  render={props => (
                    <NewBodygraphScreen {...props} user={getUser()} />
                  )}
                />                
                <Route
                  exact path='/bodygraphs'
                  render={props => (
                    <BodygraphsIndexScreen {...props} user={getUser()} />
                  )}
                />
                <Route
                  exact path='/rave-mandala/quarters-and-godheads'
                  render={props => (
                    <QuartersAndGodheadsScreen {...props} />
                  )}
                />                

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}

const { REACT_APP_API_URL } = process.env;
const HomeSignedIn = ( props ) => {
  const logout = () => {
      axios.delete(`${REACT_APP_API_URL}/logout`, {withCredentials: true})
      .then(response => {
        props.handleLogout()
        props.history.push('/')
      })
      .catch(error => console.log(error))
    }

  return (
    <div>
      <DashboardContent user={props.user} />
    </div>
  );
};
export default HomeSignedIn;
