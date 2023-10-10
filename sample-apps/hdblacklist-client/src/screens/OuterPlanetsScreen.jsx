import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CurrentUranusLine from '../widgets/outer-planets/CurrentUranusLine';
import CurrentNeptuneLine from '../widgets/outer-planets/CurrentNeptuneLine';
import CurrentPlutoLine from '../widgets/outer-planets/CurrentPlutoLine';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const { REACT_APP_API_URL } = process.env;

class OuterPlanetsScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        user: {}
       };
    } // End constructor


render() {
    return (
        <div>
            <Grid item xs={8}>
                <Item><CurrentUranusLine /></Item>
            </Grid>
            <Grid item xs={8}>
                <Item><CurrentNeptuneLine /></Item>
            </Grid>
            <Grid item xs={8}>
                <Item><CurrentPlutoLine /></Item>
            </Grid>

        </div>
    ); // End return
  } // End render()
}; // End class App

export default OuterPlanetsScreen;
