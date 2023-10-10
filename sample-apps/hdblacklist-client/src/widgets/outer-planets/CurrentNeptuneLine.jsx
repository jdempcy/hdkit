import React, { Component } from 'react';

import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';

function invalidateCache() {
  localStorage.removeItem('current-neptune-line-timestamp');
  localStorage.removeItem('current-neptune-line');
  localStorage.removeItem('next-neptune-line-timestamp');
}

function getCurrentNeptuneLineData(ephemeris) {
  let currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
  currentTime = Math.floor(currentTime); // e.g. 1643058732
  if (currentTime > localStorage.getItem('next-neptune-line-timestamp')) { invalidateCache(); }

  let endOfYearTimestamp =new Date(Date.UTC(parseInt(ephemeris.year) + 1, 0, 1));
  endOfYearTimestamp = Math.floor(endOfYearTimestamp / 1000);

  let currentNeptuneLineTimestamp = localStorage.getItem('current-neptune-line-timestamp');
  var csl = localStorage.getItem('current-neptune-line');

  if (!currentNeptuneLineTimestamp || !csl) {
    // Search for Line of the Neptune starting at current timestamp and working backward
    let match = null;
    while (match == null) {
      match = ephemeris.positions[currentTime + '000'];
      currentTime = currentTime - 1;
    }
    localStorage.setItem('current-neptune-line-timestamp', currentTime + 1);
    localStorage.setItem('current-neptune-line', match.Neptune.l);
    currentNeptuneLineTimestamp = currentTime + 1;
    csl = match.Neptune.l;
  }

  var nextNeptuneLineTimestamp = localStorage.getItem('next-neptune-line-timestamp');
  if (!nextNeptuneLineTimestamp) {
    // Look for the next change
    currentTime = Math.floor(new Date().getTime() / 1000); // e.g. 1643058732
    let nextChangeMatch = null;
    let foundNeptuneLine = csl;
    while (currentTime < endOfYearTimestamp && (nextChangeMatch === null || foundNeptuneLine === csl)) {
      nextChangeMatch = ephemeris.positions[currentTime + '000'];
      if (nextChangeMatch != null) {
        foundNeptuneLine = nextChangeMatch.Neptune.l;
      }
      currentTime = currentTime + 1;
    }
    if (currentTime >= endOfYearTimestamp) {
      let ephemerisNextYear = fetch(`https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${ephemeris.year + 1}-1s-accuracy.json`).then((response) => {
        response.json().then(jsonData => {
            return jsonData;  
          });
      });
      while (nextChangeMatch == null || foundNeptuneLine === csl) {
        nextChangeMatch = ephemerisNextYear.positions[currentTime + '000'];
        if (nextChangeMatch != null) {
          foundNeptuneLine = nextChangeMatch.Neptune.l;
        }
        currentTime = currentTime + 1;
      }
    }
    localStorage.setItem('next-neptune-line-timestamp', currentTime - 1);
    nextNeptuneLineTimestamp = currentTime - 1;
  }

  nextNeptuneLineTimestamp = new Date(parseInt(nextNeptuneLineTimestamp + '000'));
  let nextChange = DateTime.fromJSDate(nextNeptuneLineTimestamp);
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
class CurrentNeptuneLine extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentNeptuneLineData: ""
       };
    } // End constructor
  

  componentDidMount() {
    let year = DateTime.now().toFormat('yyyy');
    fetch(`https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${year}-1s-accuracy.json`).then((response) => {
      response.json().then(jsonData => {
          jsonData.year = year;
          this.setState({ currentNeptuneLineData: getCurrentNeptuneLineData(jsonData) });
          this.interval = setInterval(() => this.setState({ currentNeptuneLineData: getCurrentNeptuneLineData(jsonData) }), 1000);  
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
            Neptune Line: {this.state.currentNeptuneLineData.lineMessage}.<br />
            {this.state.currentNeptuneLineData.timeRemainingMessage}
        </Typography>
      
    </div>
  ); // End return
  }// End render()
} // End class CurrentNeptuneLine

export default CurrentNeptuneLine;