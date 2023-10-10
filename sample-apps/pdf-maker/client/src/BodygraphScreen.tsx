import React from "react";
import { SvgLoader, SvgProxy } from 'react-svgmt';
import * as Constants from './constants';
import { gradients } from './gradients';

// const svgUrl =
  // "https://raw.githubusercontent.com/flekschas/simple-world-map/master/world-map.svg";
const svgUrl = "./svg/empty-bodygraph.svg";

export function BodygraphScreen(bgWrapper: any): JSX.Element {
  const [bodygraphProperties, setBodygraphProperties] = React.useState({});
  // Note that "Solar Plexus" becomes "Solar_Plexus" (with an underscore) in our SVG file, because of lack of spaces in element IDs
  let centers:Array<string> = ["Head", "Ajna", "Throat", "Ego", "G", "Spleen", "Solar_Plexus", "Sacral", "Root"];
  let channels:Array<string> = ["1-8","2-14","3-60","4-63","5-15","6-59","7-31","9-52","10-20","10-34","10-57","11-56","12-22","13-33","16-48","17-62","18-58","19-49","20-34","20-57","21-45","23-43","24-61","25-51","26-44","27-50","28-38","29-46","30-41","32-54","34-57","35-36","37-40","39-55","42-53","47-64"];

  let defaults:any = {
    definedCenterFillColors: {
      "Head": "yellow",
      "Ajna": "green",
      "Throat": "brown",
      "Ego": "red",
      "G": "yellow",
      "Spleen": "brown",
      "Solar_Plexus": "brown",
      "Sacral": "red",
      "Root": "brown"
    },
    undefinedCenterFillColor: "white",
    definedCenterStrokeColor: "black",
    undefinedCenterStrokeColor: "black",
    centerStrokeWidth: "2",

    // Channels
    personalityActivatedChannelFillColor: "black",
    personalityActivatedChannelStrokeColor: "black",
    designActivatedChannelFillColor: "red",
    designActivatedChannelStrokeColor: "black",
    unactivatedChannelFillColor: "white",
    unactivatedChannelStrokeColor: "black",
    channelStrokeWidth: "5"
  };

  // "lowerGatesAbove" refers to when the lower numerical gate (e.g. 12) is higher, visually, than the higher numerical gate (e.g. 22)
  let lowerGatesAbove:Array<string> = ["17", "11", "16", "12", "35", "2", "6", "30", "32", "28", "18", "3", "9", "26", "25", "19", "39"];

  let xyModifiers:any = {
    "1": {x: -15, y: 0},
    "2": {x: -15, y: 0},
    "3": {x: -32, y: 40},
    "4": {x: -32, y: 24},
    "5": {x: 14, y: 0},
    "6": {x: 14, y: 0},
    "7": {x: 14, y: 0},
    "8": {x: 14, y: 0},
    "9": {x: -30, y: 40},
    "10": {x: 720, y: 1280},
    "11": {x: 0, y: -20},
    "12": {x: 0, y: 0},
    "13": {x: 0, y: 0},
    "14": {x: 0, y: 0},
    "15": {x: 0, y: 0},
    "16": {x: 0, y: 0},
    "17": {x: 0, y: -20},
    "18": {x: 0, y: 0},
    "19": {x: 0, y: 0},
    "20": {x: 720, y: 980},
    "21": {x: 0, y: 0},
    "22": {x: 0, y: 0},
    "23": {x: 0, y: 0},
    "24": {x: 0, y: 24},
    "25": {x: 0, y: 0},
    "26": {x: 0, y: 0},
    "27": {x: 0, y: 0},
    "28": {x: 0, y: 0},
    "29": {x: 0, y: 0},
    "30": {x: 0, y: 0},
    "31": {x: 0, y: 0},
    "32": {x: 0, y: 0},
    "33": {x: 0, y: 0},
    "34": {x: 0, y: 560},
    "35": {x: 0, y: 0},
    "36": {x: 0, y: 0},
    "37": {x: 0, y: 0},
    "38": {x: 0, y: 0},
    "39": {x: 0, y: 0},
    "40": {x: 0, y: 0},
    "41": {x: 0, y: 0},
    "42": {x: 0, y: 0},
    "43": {x: 0, y: -20},
    "44": {x: 0, y: 0},
    "45": {x: 0, y: 0},
    "46": {x: 0, y: 0},
    "47": {x: 0, y: 24},
    "48": {x: 0, y: 0},
    "49": {x: 0, y: 0},
    "50": {x: 0, y: 0},
    "51": {x: 0, y: 0},
    "52": {x: 0, y: 0},
    "53": {x: 0, y: 40},
    "54": {x: 0, y: 0},
    "55": {x: 0, y: 0},
    "56": {x: 0, y: 0},
    "57": {x: 0, y: 500},
    "58": {x: 0, y: 0},
    "59": {x: 0, y: 0},
    "60": {x: 0, y: 0},
    "61": {x: 0, y: 0},
    "62": {x: 0, y: 0},
    "63": {x: 0, y: 0},
    "64": {x: 0, y: 0}
  }
  let isGate10Drawn:boolean = false;
  let isGate20Drawn:boolean = false;
  let isGate34Drawn:boolean = false;
  let isGate57Drawn:boolean = false;


  // Convenience private methods
  let setChannelFill = (svg:SVGSVGElement, channel:string, gradientID:string) => { // e.g. '29-46', 'black-black'
    let query:string = `#Channel${channel} path, #Channel${channel} rect, #Channel${channel} line, #Channel${channel}_1_ path, #Channel${channel}_1_ rect, #Channel${channel}_1_ line`;
    let channelNodes:NodeListOf<SVGSVGElement> | null = svg.querySelectorAll(query) as NodeListOf<SVGSVGElement>;
    for (let i = 0; i < channelNodes.length; i++) {
      channelNodes[i].setAttribute('fill', `url(#${gradientID})`);
      channelNodes[i].setAttribute('stroke', `url(#${gradientID})`);
    }
  }

  return (
    <div style={{position: "relative", left: "-100px"}}>
    <SvgLoader width="600" height="800" path={svgUrl} onSVGReady={(svg:SVGSVGElement) => {

      // First we set up gradients for channel fills

      // Store the SVG namespace for easy reuse.
      const svgns = 'http://www.w3.org/2000/svg';

      // Create 14 different gradients for the possible combinations of channel activaiton:
      // White/white
      // Black/black
      // Red/red
      // White/red
      // White/red & black
      // White/black
      // Black/white
      // Black/red
      // Black/red & black
      // Red/white
      // Red/red & black
      // red&black /Black
      // red&/black /red
      // red&black / red&black

      /**
       * Apply the `<linearGradient>` to `<defs>`. The `x1`, `x2`, `y1` and `y2`
       * attributes define the staring and ending points, respectively, of the
       * gradient, e.g.:
       *
       * Will create a gradient moving from left to right
       * { x1: 0, x2: 1, y1: 0, y2: 0}
       *
       * Will create a gradient moving from top to bottom
       * { x1: 0, x2: 0, y1: 1, y2: 0}
       *
       * Will create a gradient moving from top left to bottom right.
       * { x1: 0, x2: 1, y1: 0, y2: 1}
       */
       // Add the `<defs>` element to `<svg>` for the gradient to render.
       if (!svg.querySelector('defs')) svg.insertBefore( document.createElementNS(svgns,'defs'), svg.firstChild);
       let defs = document.querySelector('defs') || null;

       for (let i = 0; i < gradients.length; i++) {
         let gradient = document.createElementNS(svgns, 'linearGradient');
         let stops = gradients[i].stops;

         stops.forEach(stop => { let el = document.createElementNS(svgns, 'stop');
                                 el.setAttribute('offset', stop.offset);
                                 el.setAttribute('stop-color', stop.color);
                                 gradient.appendChild(el); });

        // Continue setting attribues as normal
        gradient.setAttribute('x1', '0');
        gradient.setAttribute('x2', '0');
        gradient.setAttribute('y1', '1');
        gradient.setAttribute('y2', '0');
        gradient.setAttribute('id', gradients[i].id);
        if (defs != null) {
          defs.appendChild(gradient);
        }
       }

      // To use the gradient, use:
      // svgNode.setAttribute('fill', 'url(#Gradient)');

      // Iterate over all channels (and, thus, all gates)
      for (let i = 0; i < channels.length; i++) { // Add gates dynamically
        let channel = channels[i];
        let lowerGate:string = channel.split('-')[0]; // Lower numerically
        let higherGate:string = channel.split('-')[1]; // Higher numerically

        // Gate1 and gate2 are the harmonic gates of the channel. Gate1 is higher than gate2, visually. (Not numerically.)
        let gate1Text:string = lowerGatesAbove.includes(lowerGate) ? lowerGate : higherGate;
        let gate2Text:string = !lowerGatesAbove.includes(lowerGate) ? lowerGate : higherGate;

        let svgElement:SVGSVGElement | null = svg.querySelector('#Channel' + channel) as SVGSVGElement;

        if (svgElement == null) {
          svgElement = svg.querySelector('#Channel' + channel + '_1_') as SVGSVGElement; // Because Adobe Illustrator sometimes adds '_1_'
        }
        if (svgElement == null) {
          svgElement = svg.querySelector('#Channel' + channel + '_2_') as SVGSVGElement; // ...and Adobe Illustrator sometimes adds '_2_'
        }
        let bbox:DOMRect | null = svgElement.getBBox();

        let gate1AdditionalXModifier = 0;
        let gate2AdditionalXModifier = 0;
        if ("6 16 19 26 30 34 39".indexOf(gate1Text) != -1) {
          gate1AdditionalXModifier = bbox.width;
        }
        if ("22 27 34 36 37 38 51 54 58".indexOf(gate2Text) != -1) {
          gate2AdditionalXModifier = bbox.width;
        }


        let gate1 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        gate1.setAttribute('x', (bbox.x + xyModifiers[gate1Text].x + gate1AdditionalXModifier) + '');
        gate1.setAttribute('y', (bbox.y +  xyModifiers[gate1Text].y) + '');
        gate1.setAttribute('font-size', '40px');
        gate1.textContent = gate1Text;
        let gate1IsActivated:boolean = bgWrapper.bg.activatedGates.includes(gate1Text);

        let gate2 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        gate2.setAttribute('x', (bbox.x +  xyModifiers[gate2Text].x + gate2AdditionalXModifier) + '');
        gate2.setAttribute('y', (bbox.y + bbox.height +  xyModifiers[gate2Text].y) + '');
        gate2.setAttribute('fill', 'black');
        gate2.setAttribute('font-size', '40px');
        gate2.textContent = gate2Text;
        let gate2IsActivated:boolean = bgWrapper.bg.activatedGates.includes(gate2Text);

        // Create the backgrounds to the gates
        let textBg:any = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        let textBg2:any = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

        // Don't draw the integration channels multiple times
        if ((gate1Text == "10" && isGate10Drawn) || (gate1Text == "20" && isGate20Drawn)
                                                 || (gate1Text == "34" && isGate34Drawn)
                                                 || (gate1Text == "57" && isGate57Drawn)) {
          console.log('Already drawn', gate1) // do nothing
        } else {
          svg.appendChild(gate1);
          svg.insertBefore(textBg, gate1);
        }
        // Don't draw the integration channels multiple times
        if ((gate2Text == "10" && isGate10Drawn) || (gate2Text == "20" && isGate20Drawn)
                                                 || (gate2Text == "34" && isGate34Drawn)
                                                 || (gate2Text == "57" && isGate57Drawn)) {
          console.log('Already drawn', gate2) // do nothing
        } else {
          svg.appendChild(gate2);
          svg.insertBefore(textBg2, gate2);
        }


        // Continue adding the background ("textBg")
        let textBbox:DOMRect | null = gate1.getBBox();
        if (gate1Text.length == 1) {
          textBg.setAttribute("x", textBbox.x - 14);
        } else {
          textBg.setAttribute("x", textBbox.x);
        }
        textBg.setAttribute("y", textBbox.y);
        textBg.setAttribute("rx", 12);
        textBg.setAttribute("ry", 12);
        textBg.setAttribute("width", 48);
        textBg.setAttribute("height", textBbox.height);

        let textBbox2:DOMRect | null = gate2.getBBox();
        if (gate2Text.length == 1) {
          textBg2.setAttribute("x", textBbox2.x - 14);
        } else {
          textBg2.setAttribute("x", textBbox2.x);
        }
        textBg2.setAttribute("y", textBbox2.y);
        textBg2.setAttribute("rx", 12);
        textBg2.setAttribute("ry", 12);
        textBg2.setAttribute("width", 48);
        textBg2.setAttribute("height", textBbox2.height);

        console.log('checking if gate1 is activated', gate1);

        if (gate1IsActivated) {
          console.log('gate1 is activated!', gate1);
          gate1.setAttribute('fill', 'white');
          console.log('gate1', gate1);
          console.log(bgWrapper.bg.activatedPersonalityGates);
          if (bgWrapper.bg.activatedPersonalityGates.includes(parseInt(gate1Text))) {
            if (bgWrapper.bg.activatedDesignGates.includes(parseInt(gate1Text))) {
              textBg.setAttribute("fill", 'url(#blackandred-blackandred)');
            } else {
              textBg.setAttribute("fill", "grey");
            }
          } else {
            textBg.setAttribute("fill", "darkred");
          }
        } else {
          gate1.setAttribute('fill', 'grey');
          textBg.setAttribute("fill", "white");
        }

        if (gate2IsActivated) {
          gate2.setAttribute('fill', 'white');
          if (bgWrapper.bg.activatedPersonalityGates.includes(parseInt(gate2Text))) {
            if (bgWrapper.bg.activatedDesignGates.includes(parseInt(gate2Text))) {
              textBg.setAttribute("fill", 'url(#blackandred-blackandred)');
            } else {
              textBg.setAttribute("fill", "grey");
            }
          } else {
            textBg2.setAttribute("fill", "darkred");
          }

        } else {
          gate2.setAttribute('fill', 'grey');
          textBg2.setAttribute("fill", "white");
        }

        // Keep track of if any of the integration gates have been drawn
        if (gate1Text == "10" || gate2Text == "10") isGate10Drawn = true;
        if (gate1Text == "20" || gate2Text == "20") isGate20Drawn = true;
        if (gate1Text == "34" || gate2Text == "34") isGate34Drawn = true;
        if (gate1Text == "57" || gate2Text == "57") isGate57Drawn = true;

        // Finished drawing the gates

        // Let's color the channels....
        let personalityGates = bgWrapper.bg.activatedPersonalityGates;
        let designGates = bgWrapper.bg.activatedDesignGates
        let firstGate:number = parseInt(gate1Text);
        let harmonicGate:number = parseInt(gate2Text);

        if ([11, 26, 28, 47].includes(firstGate)) {
          let tempGate = firstGate;
          firstGate = harmonicGate;
          harmonicGate = tempGate;
        }
        console.log('first gate, harmonic gate ', firstGate, harmonicGate);
        if (!personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'white-white'); // Empty channel
        } else if (personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'black-black'); // Activated
        } else if (personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'blackandred-blackandred'); // Activated
        } else if (!personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'red-red'); // Activated
        } else if (!personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'red-blackandred'); // Activated
        } else if (personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'blackandred-red'); // Activated
        } else if (personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'black-blackandred'); // Activated
        } else if (personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'blackandred-black'); // Activated
        } else if (!personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'red-black'); // Activated
        } else if (personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'black-red'); // Activated
        } else if (!personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'red-white'); // Hanging gate
        } else if (!personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'white-red');  // Hanging gate
        } else if (personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'black-white'); // Hanging gate
        } else if (!personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'white-black'); // Hanging gate
        } else if (personalityGates.includes(firstGate)
            && !personalityGates.includes(harmonicGate)
            && designGates.includes(firstGate)
            && !designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'blackandred-white'); // Hanging gate
        } else if (!personalityGates.includes(firstGate)
            && personalityGates.includes(harmonicGate)
            && !designGates.includes(firstGate)
            && designGates.includes(harmonicGate)) {
          setChannelFill(svg, channel, 'white-blackandred'); // Hanging gate
        }




      }





      // Now let's color them for Personality and Design!

      // And then color the channels...
      for (let i = 0; i < bgWrapper.bg.activatedGates.length; i++) {
        let gate:number = parseInt(bgWrapper.bg.activatedGates[i]);
        let harmonic:number[] = Constants.harmonicGates[gate];
        if (harmonic.length == 1) { // If it isn't integration circuitry (which has harmonic length of 3) ...
          let channel:string = Math.min(gate, harmonic[0]) + '-' + Math.max(gate, harmonic[0]);
          if (bgWrapper.bg.channels.includes(channel)) { // Channel is activated!

          }
        } else { // It is integration
           console.log ('integration circuitry');
        }
      }



    }}>
      <SvgProxy />
      {centers.map(center => (
        <SvgProxy
          key={center}
          selector={`#${center} polygon, #${center} rect, #${center} polyline`}
          fill={bgWrapper.bg.definedCenters.includes(center) ? defaults.definedCenterFillColors[center] : defaults.undefinedCenterFillColor}
          stroke={bgWrapper.bg.definedCenters.includes(center) ? defaults.definedCenterStrokeColor : defaults.undefinedCenterStrokeColor}
        />
      ))}
    </SvgLoader></div>
  );
}



// <SvgLoader width="100" height="100" path="./assets/empty-bodygraph.svg">
// </SvgLoader>

// <SvgLoader width="300" height="450" path="./assets/empty-bodygraph.svg">
//   <SvgProxy selector="path, line" onElementSelected={(pathOrLine:any) => {
//       console.log(pathOrLine);
//   }}
//   />
// </SvgLoader>
