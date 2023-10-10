import React, { Component } from 'react';

import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';

function invalidateCache() {
  localStorage.removeItem('current-pluto-line-timestamp');
  localStorage.removeItem('current-pluto-line');
  localStorage.removeItem('next-pluto-line-timestamp');
}

function getCurrentPlutoLineData(ephemeris) {
  let currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
  currentTime = Math.floor(currentTime); // e.g. 1643058732
  if (currentTime > localStorage.getItem('next-pluto-line-timestamp')) { invalidateCache(); }
 
  let endOfYearTimestamp =new Date(Date.UTC(parseInt(ephemeris.year) + 1, 0, 1));
  endOfYearTimestamp = Math.floor(endOfYearTimestamp / 1000);

  let currentPlutoLineTimestamp = localStorage.getItem('current-pluto-line-timestamp');
  var csl = localStorage.getItem('current-pluto-line');

  if (!currentPlutoLineTimestamp || !csl) {
    // Search for Line of the Pluto starting at current timestamp and working backward
    let match = null;
    while (match == null) {
      match = ephemeris.positions[currentTime + '000'];
      currentTime = currentTime - 1;
    }
    localStorage.setItem('current-pluto-line-timestamp', currentTime + 1);
    localStorage.setItem('current-pluto-line', match.Pluto.l);
    currentPlutoLineTimestamp = currentTime + 1;
    csl = match.Pluto.l;
  }

  var nextPlutoLineTimestamp = localStorage.getItem('next-pluto-line-timestamp');
  if (!nextPlutoLineTimestamp) {
    // Look for the next change
    currentTime = Math.floor(new Date().getTime() / 1000); // e.g. 1643058732
    let nextChangeMatch = null;
    let foundPlutoLine = csl;
    while (currentTime < endOfYearTimestamp && (nextChangeMatch === null || foundPlutoLine === csl)) {
      nextChangeMatch = ephemeris.positions[currentTime + '000'];
      if (nextChangeMatch != null) {
        foundPlutoLine = nextChangeMatch.Pluto.l;
      }
      currentTime = currentTime + 1;
    }
    if (currentTime >= endOfYearTimestamp) {
      let ephemerisNextYear = fetch(`https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${ephemeris.year + 1}-1s-accuracy.json`).then((response) => {
        response.json().then(jsonData => {
            return jsonData;  
          });
      });
      while (nextChangeMatch == null || foundPlutoLine === csl) {
        nextChangeMatch = ephemerisNextYear.positions[currentTime + '000'];
        if (nextChangeMatch != null) {
          foundPlutoLine = nextChangeMatch.Pluto.l;
        }
        currentTime = currentTime + 1;
      }
    }
    localStorage.setItem('next-pluto-line-timestamp', currentTime - 1);
    nextPlutoLineTimestamp = currentTime - 1;
  }

  nextPlutoLineTimestamp = new Date(parseInt(nextPlutoLineTimestamp + '000'));
  let nextChange = DateTime.fromJSDate(nextPlutoLineTimestamp);
  let timeDiff = nextChange.diff(DateTime.now(), ['days', 'hours', 'minutes', 'seconds']);
  let timeRemaining = "";
  if (timeDiff.days > 0) {
    timeRemaining += `${timeDiff.days} days, `;  
  }
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
class CurrentPlutoLine extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPlutoLineData: ""
       };
    } // End constructor
  

  componentDidMount() {
    let year = DateTime.now().toFormat('yyyy');
    fetch(`https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${year}-1s-accuracy.json`).then((response) => {
      response.json().then(jsonData => {
          jsonData.year = year;
          this.setState({ currentPlutoLineData: getCurrentPlutoLineData(jsonData) });
          this.interval = setInterval(() => this.setState({ currentPlutoLineData: getCurrentPlutoLineData(jsonData) }), 1000);  
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
            Pluto Line: {this.state.currentPlutoLineData.lineMessage}.<br />
            {this.state.currentPlutoLineData.timeRemainingMessage}
        </Typography>
      
    </div>
  ); // End return
  }// End render()
} // End class CurrentPlutoLine

export default CurrentPlutoLine;