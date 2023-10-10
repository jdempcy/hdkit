import React, { Component } from 'react';

import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';

function invalidateCache() {
  localStorage.removeItem('current-moon-line-timestamp');
  localStorage.removeItem('current-moon-line');
  localStorage.removeItem('next-moon-line-timestamp');
}

function getCurrentMoonLineData(ephemeris) {
  let currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
  currentTime = Math.floor(currentTime); // e.g. 1643058732
  if (currentTime > localStorage.getItem('next-moon-line-timestamp')) { invalidateCache(); }

  let endOfYearTimestamp =new Date(Date.UTC(parseInt(ephemeris.year) + 1, 0, 1));
  endOfYearTimestamp = Math.floor(endOfYearTimestamp / 1000);

  let currentMoonLineTimestamp = localStorage.getItem('current-moon-line-timestamp');
  var csl = localStorage.getItem('current-moon-line');

  if (!currentMoonLineTimestamp || !csl) {
    // Search for Line of the Moon starting at current timestamp and working backward
    let match = null;
    while (match == null) {
      match = ephemeris.positions[currentTime + '000'];
      currentTime = currentTime - 1;
    }
    localStorage.setItem('current-moon-line-timestamp', currentTime + 1);
    localStorage.setItem('current-moon-line', match.Moon.l);
    currentMoonLineTimestamp = currentTime + 1;
    csl = match.Moon.l;
  }

  var nextMoonLineTimestamp = localStorage.getItem('next-moon-line-timestamp');
  if (!nextMoonLineTimestamp) {
    // Look for the next change
    currentTime = Math.floor(new Date().getTime() / 1000); // e.g. 1643058732
    let nextChangeMatch = null;
    let foundMoonLine = csl;
    while (currentTime < endOfYearTimestamp && (nextChangeMatch === null || foundMoonLine === csl)) {
      nextChangeMatch = ephemeris.positions[currentTime + '000'];
      if (nextChangeMatch != null) {
        foundMoonLine = nextChangeMatch.Moon.l;
      }
      currentTime = currentTime + 1;
    }
    if (currentTime >= endOfYearTimestamp) {
      let ephemerisNextYear = fetch(`https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${ephemeris.year + 1}-1s-accuracy.json`).then((response) => {
        response.json().then(jsonData => {
            return jsonData;  
          });
      });
      while (nextChangeMatch == null || foundMoonLine === csl) {
        nextChangeMatch = ephemerisNextYear.positions[currentTime + '000'];
        if (nextChangeMatch != null) {
          foundMoonLine = nextChangeMatch.Moon.l;
        }
        currentTime = currentTime + 1;
      }
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
  let nextLine = parseInt(csl) + 1;
  if (nextLine === 7) { nextLine = 1; }

  if (timeDiff.seconds < 0) { // Negative seconds means the nextChange has occurred and the cache is invalid
    invalidateCache();
  }

  return {
    lineMessage: {
      1: "1 - The Investigator",
      2: "2 - The Hermit",
      3: "3 - The Martyr",
      4: "4 - The Opportunist",
      5: "5 - The Heretic",
      6: "6 - The Role Model"
    }[csl],

    timeRemainingMessage: `${timeRemaining} remaining until Line ${nextLine}.`
  }
}
class CurrentMoonLine extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentMoonLineData: ""
       };
    } // End constructor
  

  componentDidMount() {
    let year = DateTime.now().toFormat('yyyy');
    fetch(`https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${year}-1s-accuracy.json`).then((response) => {
      response.json().then(jsonData => {
          jsonData.year = year;
          this.setState({ currentMoonLineData: getCurrentMoonLineData(jsonData) });
          this.interval = setInterval(() => this.setState({ currentMoonLineData: getCurrentMoonLineData(jsonData) }), 1000);  
        });
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
  return (
    <div>
        <Typography variant="body1" color="text.secondary" align="left">
            Moon Line: {this.state.currentMoonLineData.lineMessage}.<br />
            {this.state.currentMoonLineData.timeRemainingMessage}
        </Typography>
      
    </div>
  ); // End return
  }// End render()
} // End class CurrentMoonLine

export default CurrentMoonLine;