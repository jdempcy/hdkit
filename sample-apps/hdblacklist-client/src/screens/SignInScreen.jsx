import React, { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// MUI Imports
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
// HD Blacklist Logo
import HDBlacklistLogo from "../assets/hd-blacklist-logo.png";
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Axios
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.hdblacklist.com/">
        www.hdblacklist.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    overrides: {
      MuiOutlinedInput: {
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #000 inset',
            '-webkit-text-fill-color': '#fff'
          }
        }
      }
    }
  },

});

const { REACT_APP_API_URL } = process.env;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
     };
  }

  handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let user = {
        email: data.get('email'),
        password: data.get('password'),
      };
  
      axios.post(`${REACT_APP_API_URL}/login`, {user}, {withCredentials: true})
        .then(response => {
          if (response.data.logged_in) {
            console.log('Successfully logged in.', response.data);
            this.props.handleLogin(response.data);
            this.redirect();
          } else {
            console.log('Errors:', response.data.errors);
            this.setState({
              errors: response.data.errors
            })
          }
        })
        .catch(error => console.log('API errors:', error));
  }; // end handleSubmit()

  redirect = () => {
      this.props.history.push('/')
  };

  handleErrors = () => {
      return (
        <div>
          <ul>
          {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
            })}
          </ul>
        </div>
      )
  };

render() {
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          <Box
              component="img"
              sx={{
                width: 250,
              }}
              alt="HD Blacklist"
              src={HDBlacklistLogo}
          /><br/><br/>
        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {this.handleErrors()}
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
      );
    }
}
export default SignIn;