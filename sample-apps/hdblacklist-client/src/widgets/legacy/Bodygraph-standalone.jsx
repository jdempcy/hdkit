import React, { Component } from 'react';

import {ReactComponent as BodygraphSVG} from '../assets/bodygraph-blank.svg';
import { DateTime } from 'luxon';
import { oppositeGate } from '../../hd-utils/opposite-gate.js';

function drawBodygraphActivationsForCurrentTime(ephemeris) {
  let currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
  currentTime = Math.floor(currentTime); // e.g. 1643058732
  // Search for current activation starting at current timestamp and working backward
  let match = null;
  while (match == null) {
    match = ephemeris.positions[currentTime + '000'];
    currentTime = currentTime - 1;
  }
  // Draw for match 
  drawBodygraph(match);
}

function updateBodygraphActivationsForCurrentTime(ephemeris) {
  let currentTime = new Date().getTime() / 1000; // e.g. 1643058732.234
  currentTime = Math.floor(currentTime); // e.g. 1643058732
  let match = ephemeris.positions[currentTime + '000'];
  if (match !== null) {
    // Draw for match
    drawBodygraph(match);
  }
}

function drawBodygraph(match) {
  if (match == null) { return; };
  // console.log(match); 
  // e.g. ...
    // Jupiter: {g: 37, l: 1, c: 4}
    // Mars: {g: 10, l: 5, c: 5}
    // Mercury: {g: 60, l: 2, c: 3}
    // Moon: {g: 5, l: 2}
    // Neptune: {g: 22, l: 5, c: 4}
    // NorthNode: {g: 8, l: 6, c: 1, t: 1}
    // Pluto: {g: 60, l: 1, c: 3}
    // Saturn: {g: 13, l: 2, c: 6}
    // Sun: {g: 19, l: 1, c: 4, t: 5}
    // Uranus: {g: 24, l: 4, c: 3}
    // Venus: {g: 38, l: 2, c: 5}
    //
    // Note: Ignore south node and earth positions if present.
    let earthGate = oppositeGate(match.Sun.g);
    let southNodeGate = oppositeGate(match.NorthNode.g);
    let activations = [match.Sun.g, earthGate, match.NorthNode.g, southNodeGate, match.Moon.g, match.Mercury.g, match.Venus.g, match.Mars.g, match.Jupiter.g, match.Saturn.g, match.Uranus.g, match.Neptune.g, match.Pluto.g]; 

    let textBgOutlineHeadGates = document.querySelectorAll('#GateTextBg64 path:first-child, #GateTextBg61 path:first-child, #GateTextBg63 path:first-child');
    textBgOutlineHeadGates.forEach( (gate) => {
      gate.setAttribute('stroke', 'transparent');
    });


    for (let i = 1; i <= 64; i++) {
      let gate = null;
      if (i == 34) {
        gate = document.querySelector(`#Gate${i} polygon:first-child`);
      } else {
        gate = document.querySelector(`#Gate${i}, #Gate${i}_1_`);
      }
      let textBg = document.querySelector(`#GateTextBg${i} path:first-child, #GateTextBg${i} circle:first-child`);
      let textBgOutline = document.querySelector(`#GateTextBg${i}`);
      let text = document.querySelector(`#GateText${i}, #GateText${i}_1_`);
      if (activations.includes(i)) {
        gate && gate.setAttribute('fill', 'black');
        textBg && textBg.setAttribute('fill', 'grey');
        textBg && textBg.setAttribute('opacity', '.5');
        text && text.setAttribute('fill', 'white');
      } else {
        gate && gate.setAttribute('fill', 'white');
        textBg && textBg.setAttribute('fill', 'transparent');
        textBg && textBg.setAttribute('opacity', '1');
        text && text.setAttribute('fill', 'lightgrey');
      }
      textBgOutline.setAttribute('fill', 'transparent');
    }

    // Light up the centers!
    let definedCenters ={
      Head: false,
      Ajna: false,
      Throat: false,
      G: false,
      Ego: false,
      SolarPlexus: false,
      Spleen: false,
      Sacral: false,
      Root: false
    }
    // Head-Ajna channels
    if (activations.includes(64) && activations.includes(47) ||
        activations.includes(61) && activations.includes(24) ||
        activations.includes(63) && activations.includes(4)) {
          definedCenters.Head = true;
          definedCenters.Ajna = true;
        }
    // Ajna-Throat channels
    if (activations.includes(17) && activations.includes(62) ||
        activations.includes(43) && activations.includes(23) ||
        activations.includes(11) && activations.includes(56)) {
          definedCenters.Ajna = true;
          definedCenters.Throat = true;
        }

    // Throat-G channels
    if (activations.includes(20) && activations.includes(10) ||
        activations.includes(31) && activations.includes(7) ||
        activations.includes(8) && activations.includes(1) ||
        activations.includes(33) && activations.includes(13)) {
          definedCenters.Throat = true;
          definedCenters.G = true;
        }

    // Throat-Ego channel (21-45)
    if (activations.includes(21) && activations.includes(45)) {
      definedCenters.Throat = true;
      definedCenters.Ego = true;
    }

    // Throat-Solar Plexus channels
    if (activations.includes(12) && activations.includes(22) ||
        activations.includes(35) && activations.includes(36)) {
          definedCenters.Throat = true;
          definedCenters.SolarPlexus = true;
        }


    // Throat-Sacral channel (34-20)
    if (activations.includes(34) && activations.includes(20)) {
      definedCenters.Throat = true;
      definedCenters.Sacral = true;
    }

    // Throat-Spleen channels
    if (activations.includes(20) && activations.includes(57) ||
        activations.includes(16) && activations.includes(48)) {
          definedCenters.Throat = true;
          definedCenters.SolarPlexus = true;
        }

    // Solar Plexus-Ego channel (37-40)
    if (activations.includes(37) && activations.includes(40)) {
      definedCenters.SolarPlexus = true;
      definedCenters.Ego = true;
    }

    // Solar Plexus-Sacral channel (6-59)
    if (activations.includes(6) && activations.includes(59)) {
      definedCenters.SolarPlexus = true;
      definedCenters.Sacral = true;
    }

    // Ego-G channel (51-25)
    if (activations.includes(51) && activations.includes(25)) {
      definedCenters.G = true;
      definedCenters.Ego = true;
    }

    // Spleen-Ego channel (44-26)
    if (activations.includes(44) && activations.includes(26)) {
      definedCenters.Ego = true;
      definedCenters.Spleen = true;
    }

    // G-Spleen channel (10-57)
    if (activations.includes(10) && activations.includes(57)) {
      definedCenters.G = true;
      definedCenters.Spleen = true;
    }

  // Spleen-Sacral channels
  if (activations.includes(50) && activations.includes(27) ||
      activations.includes(57) && activations.includes(34)) {
        definedCenters.G = true;
        definedCenters.Spleen = true;
      }

  // Sacral-G channels
  if (activations.includes(34) && activations.includes(10) ||
      activations.includes(5) && activations.includes(15) ||
      activations.includes(2) && activations.includes(14) ||
      activations.includes(29) && activations.includes(46)) {
        definedCenters.Sacral = true;
        definedCenters.G = true;
      }
  // Root-Sacral channels (i.e. the format channels)
  if (activations.includes(53) && activations.includes(42) ||
      activations.includes(60) && activations.includes(3) ||
      activations.includes(52) && activations.includes(9)) {
        definedCenters.Sacral = true;
        definedCenters.Root = true;
      }
  // Root-Spleen channels
  if (activations.includes(54) && activations.includes(32) ||
      activations.includes(38) && activations.includes(28) ||
      activations.includes(58) && activations.includes(18)) {
        definedCenters.Spleen = true;
        definedCenters.Root = true;
      }
  // Root-Solar Plexus channels
  if (activations.includes(19) && activations.includes(49) ||
      activations.includes(39) && activations.includes(55) ||
      activations.includes(41) && activations.includes(30)) {
        definedCenters.SolarPlexus = true;
        definedCenters.Root = true;
      }
    
  let brown = '#79502D';
  document.querySelector('#Head path').setAttribute('fill', definedCenters.Head ? 'yellow' : 'white')
  document.querySelector('#Ajna path').setAttribute('fill', definedCenters.Ajna ? 'green' : 'white')
  document.querySelector('#Throat path').setAttribute('fill', definedCenters.Throat ? brown : 'white')
  document.querySelector('#Ego path').setAttribute('fill', definedCenters.Ego ? 'red' : 'white')
  document.querySelector('#G path').setAttribute('fill', definedCenters.G ? 'yellow' : 'white')
  document.querySelector('#Spleen path').setAttribute('fill', definedCenters.Spleen ? brown : 'white')
  document.querySelector('#Solar_Plexus path').setAttribute('fill', definedCenters.SolarPlexus ? brown : 'white')
  document.querySelector('#Sacral path').setAttribute('fill', definedCenters.Sacral ? 'red' : 'white')
  document.querySelector('#Root path').setAttribute('fill', definedCenters.Root ? brown : 'white')
      
}


class Bodygraph extends Component {
    constructor(props) {
      super(props);
      this.state = {
       };
    } // End constructor
  

  componentDidMount() {
    let year = DateTime.now().toFormat('yyyy');
    fetch(`https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-forecast-${year}-1s-accuracy.json`).then((response) => {
      response.json().then(ephemeris => {
          drawBodygraphActivationsForCurrentTime(ephemeris);
          this.interval = setInterval(() => { updateBodygraphActivationsForCurrentTime(ephemeris) }, 1000);  
        });
    });

  }
  componentWillUnmount() {
  }

  render() {
  return (
    <div>
      <BodygraphSVG />
    </div>
  ); // End return
  }// End render()
} // End class Bodygraph

export default Bodygraph;