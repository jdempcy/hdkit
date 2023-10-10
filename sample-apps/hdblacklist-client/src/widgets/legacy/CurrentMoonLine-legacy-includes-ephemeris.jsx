import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import ephemeris from '../ephemeris-annual-forecast-2022-1s-accuracy.json';
import { DateTime } from 'luxon';

function invalidateCache() {
  localStorage.setItem('current-moon-line-timestamp', null);
  localStorage.setItem('current-moon-line', null);
  localStorage.setItem('next-moon-line-timestamp', null);
}

function getCurrentMoonLine() {
  let currentTime = -1;

  let currentMoonLineTimestamp = localStorage.getItem('current-moon-line-timestamp');
  var cml = localStorage.getItem('current-moon-line');
  if (!currentMoonLineTimestamp || !cml) {
    currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
    currentTime = Math.floor(currentTime); // e.g. 1643058732
    // Search for Line of the Moon starting at current timestamp and working backward
    let match = null;
    while (match == null) {
      match = ephemeris.positions[currentTime + '000'];
      currentTime = currentTime - 1;
    }
    localStorage.setItem('current-moon-line-timestamp', currentTime + 1);
    localStorage.setItem('current-moon-line', match.Moon.l);
    currentMoonLineTimestamp = currentTime + 1;
    cml = match.Moon.l;
  }

  var nextMoonLineTimestamp = localStorage.getItem('next-moon-line-timestamp');
  if (!nextMoonLineTimestamp) {
    // Look for the next change
    currentTime = Math.floor(new Date().getTime() / 1000); // e.g. 1643058732
    let nextChangeMatch = null;
    let foundMoonLine = cml;
    while (nextChangeMatch == null || foundMoonLine == cml) {
      nextChangeMatch = ephemeris.positions[currentTime + '000'];
      if (nextChangeMatch != null) {
        foundMoonLine = nextChangeMatch.Moon.l;
      }
      currentTime = currentTime + 1;
    }
    localStorage.setItem('next-moon-line-timestamp', currentTime - 1);
    nextMoonLineTimestamp = currentTime - 1;
  }

  nextMoonLineTimestamp = new Date(parseInt(nextMoonLineTimestamp + '000'));
  let nextChange = DateTime.fromJSDate(nextMoonLineTimestamp);
  let timeDiff = nextChange.diff(DateTime.now(), ['hours', 'minutes', 'seconds']);
  let timeRemaining = "";
  if (timeDiff.hours > 0) {
    timeRemaining += `${timeDiff.hours} hours, `;  
  }
  if (timeDiff.minutes > 0) {
    timeRemaining += `${timeDiff.minutes} minutes, `;  
  }
  timeRemaining += `${Math.floor(timeDiff.seconds)} seconds`;
  let nextLine = parseInt(cml) + 1;
  if (nextLine == 7) { nextLine = 1; }

  if (timeDiff.seconds < 0) { // Negative seconds means the nextChange has occurred and the cache is invalid
    invalidateCache();
  }

  let message = {
    1: "1 - The Investigator",
    2: "2 - The Hermit",
    3: "3 - The Martyr",
    4: "4 - The Opportunist",
    5: "5 - The Heretic",
    6: "6 - The Role Model"
  }[cml] + `.  ${timeRemaining} remaining until Line ${nextLine}.`;
  return {
    message: message
  }
}
class CurrentMoonLine extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentMoonLineMessage: ""
       };
    } // End constructor
  

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ currentMoonLineMessage: getCurrentMoonLine().message }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
  return (
    <div>
        <Typography variant="body1" color="text.secondary" align="left">
            Moon Line: {this.state.currentMoonLineMessage}
        </Typography>
      
    </div>
  ); // End return
  }// End render()
} // End class CurrentMoonLine

export default CurrentMoonLine;