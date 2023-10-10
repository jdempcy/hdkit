import React, { Component } from 'react';

import Typography from '@mui/material/Typography';
import ephemeris from '../../ephemeris-annual-forecast-2022-1s-accuracy.json';

function getCurrentMotivation() {
  let currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
  currentTime = Math.floor(currentTime); // e.g. 1643058732
  // Search for Color starting at current timestamp and working backward
  let match = null;
  let counter = 0;
  while (match == null) {
    counter++
    match = ephemeris.positions[currentTime + '000'];
    currentTime = currentTime - 1;
  }
  return {
    1: "1 - Fear",
    2: "2 - Hope",
    3: "3 - Desire",
    4: "4 - Need",
    5: "5 - Guilt",
    6: "6 - Innocence"
  }[match.Sun.c];
}
class CurrentMotivation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentMotivation: ""
       };
    } // End constructor
  

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ currentMotivation: getCurrentMotivation() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
  return (
    <div>
        <Typography variant="body1" color="text.secondary" align="left">
            Motivation: {this.state.currentMotivation}
        </Typography>
      
    </div>
  ); // End return
  }// End render()
} // End class CurrentMotivation

export default CurrentMotivation;