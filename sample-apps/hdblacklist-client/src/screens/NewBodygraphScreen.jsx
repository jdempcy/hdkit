import React, { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { DateTime } from "luxon";
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import HDBlacklistLogo from "../assets/hd-blacklist-logo.png";
import Link from '@mui/material/Link';
import NewBodygraphDateTimePickers from './NewBodygraphDateTimePickers';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UniversalGeocoder from "universal-geocoder";
import axios from 'axios';
import { getBodygraphJson } from '../hd-utils/get-bodygraph-json';

const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
  provider: "openstreetmap",
  userAgent: "HD Blacklist",
  email: "jdempcy@gmail.com"
});
const { find } = require('geo-tz');


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

const theme = createTheme();
const { REACT_APP_API_URL } = process.env;

class NewBodygraphScreen extends Component {
  constructor(props) {
    super(props);
    console.log('props', props)
    this.state = {
      user: props.user,
      errors: []
     };
  }

  getUserId = () => {
    console.log('getUserId called ... returning ', this.state.user.id);
    return this.state.user.id;
  }

  handleSubmit =  (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

    // var apiKey = process.env.GOOGLE_CLOUD_API_KEY;
		// const geocoder = NodeGeocoder({
		//   provider: 'google',
		//   apiKey: apiKey
		// });


		// Set the correct date by combining birthdate and birthtime
		var timezone;
		if (data.get('location') == "") {
			timezone = 'utc';
		} else {

      openStreetMapGeocoder.geocode(data.get('location'), async (res) => {
        console.log('res');
        console.log(res);
     
        res = res[0]; // First result
        
        // Perform timezone lookup
        timezone = find(res.bounds.latitudeSW, res.bounds.longitudeSW)[0]; // e.g. 'America/Chicago'
        console.log('Time zone found: ', timezone);  

        let birthdateArray = data.get('birthdate').split('/');
        let birthtimeArray = data.get('birthtime').split(':');
        let amOrPm = birthtimeArray[1].split(' ')[1];
        birthtimeArray[1] = birthtimeArray[1].split(' ')[0];

        if (amOrPm === 'pm') {
          birthtimeArray[0] = parseInt(birthtimeArray[0]) + 12;
        }

        console.log('birthdate', birthdateArray)
        console.log('birthtime', birthtimeArray)

        let dateObj = {
          day: parseInt(birthdateArray[1]),
          month: parseInt(birthdateArray[0]),
          year: parseInt(birthdateArray[2]),
          hour: parseInt(birthtimeArray[0]),
          minute: parseInt(birthtimeArray[1]),
          second: 30
        };

        let date = DateTime.fromObject(dateObj, {
          zone: timezone
        });


        console.log('=====************====')
        console.log('=====************====')
        console.log('=====************====')
        console.log('DATE VALUES =========')
        console.log('=====************====')
        console.log('=====************====')
        console.log('=====************====')

        console.log('date.toISO()',date.toISO());


        console.log('=====************====')
        console.log('=====************====')
        console.log('=====************====')
        console.log('=====************====')

        var dateTimeLocal = date

        console.log('dateTimeLocal', dateTimeLocal);                                          
        console.log('dateTimeLocal.ts', dateTimeLocal.ts);                                          
        console.log('dateTimeLocal.isValid', dateTimeLocal.isValid);                                          
        console.log('dateTimeLocal.invalidReason', dateTimeLocal.invalidReason);                                          
    

        let bodygraphJson = await getBodygraphJson(data.get('name'), date.ts, data.get('location'));
    
        let bodygraph = {
          name: data.get('name'),
          birthtime: dateTimeLocal.ts,
          json: JSON.stringify(bodygraphJson),
          user_id: this.getUserId(),
          hd_type: bodygraphJson.type,
          profile: bodygraphJson.profile,
          p_sun: `${bodygraphJson.activations.Personality.Sun.g}.${bodygraphJson.activations.Personality.Sun.l}`
        };
        console.log('bodygraph.json');
        console.log(bodygraph.json);
        console.log('bodygraph');
        console.log(bodygraph);

      axios.post(`${REACT_APP_API_URL}/bodygraphs`, {bodygraph}, {withCredentials: true})
        .then(response => {
            console.log('Response from posting to bodygraphs:', response.data);
        })
        .catch(error => console.log('API errors:', error));

      }, (e) => {
        console.log('failed to geocode', e);
      });
		}



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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
      <Typography variant="h5" color="text.secondary" align="center">
        Add a New Bodygraph
      </Typography>

        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack spacing={3}>

            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              defaultValue="Jonah Dempcy"
              autoComplete="name"
              autoFocus
            />
            <NewBodygraphDateTimePickers />
            <TextField
              margin="normal"
              fullWidth
              id="location"
              label="Location (e.g. paris, france)"
              name="location"
              defaultValue="Malden, MA"
              autoComplete="location"
            />
        </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
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
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
      );
    }
}
export default NewBodygraphScreen;