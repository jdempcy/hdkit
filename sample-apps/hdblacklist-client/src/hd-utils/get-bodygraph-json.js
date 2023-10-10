import { oppositeGate } from './opposite-gate';

function getActivationFromDegrees(degrees) { // Degrees are relative to beginning of Gate 41, i.e. 0º0'0" is Gate 41 L1C1T1B1.

  let [gate, line, color, tone, base] = Array(5).fill(1); // gate == 1, line == 1 etc

  let percentageThrough = degrees / 360;
  let gateIndex = Math.floor(percentageThrough * 64);
  gate = Gates.order[gateIndex];
  line = (Math.floor(percentageThrough * 384) % 6) + 1;
  color = (Math.floor(percentageThrough * 2304) % 6) + 1;
  tone = (Math.floor(percentageThrough * 13824) % 6) + 1;
  base = (Math.floor(percentageThrough * 69120) % 5) + 1;

  return {
    g: gate,
    l: line,
    c: color,
    t: tone,
    b: base
  };
}

export const getBodygraphJson = async (name, birthtime, location) => {
    let bodygraph = {
        name: name,
        birthtime: birthtime,
        location: location,
    
        // Everything past this point is populated by ephemeris calls and utility methods below
        profile: "",
        channels: [],
        type: "",
        authority: "",
        definition: "",
        definedCenters: [],
        totalProcessingTime: -1,
        activatedGates: [],
        activatedPersonalityGates: [],
        activatedDesignGates: [],
        allActivations: [],
        circuitries: [],
        variable: "",
        activations: {
          Personality: {
            Sun: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Earth: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            NorthNode: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            SouthNode: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Moon: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Mercury: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Venus: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Mars: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Jupiter: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Saturn: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Uranus: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Neptune: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Pluto: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            }
          },
          Design: {
            Sun: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Earth: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            NorthNode: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            SouthNode: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Moon: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Mercury: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Venus: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Mars: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Jupiter: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Saturn: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Uranus: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Neptune: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            },
            Pluto: {
              Gate: -1,
              Line: -1,
              Color: -1,
              Tone: -1,
              Base: -1
            }
          }
        }
      };

      let year = new Date(birthtime).getFullYear();
      console.log("Fetching ephemeris...");
      await fetch(
        `https://hdblacklist-proxy.herokuapp.com/https://hungry-goldwasser-6106a1.netlify.app/ephemeris-annual-${year}-1s-accuracy.json`
      ).then(async (response) => {
        await response.json().then((jsonData) => {
            let match = null;
            console.log('searching birth time for birthtime: ', birthtime)
            let searchingBirthtime = birthtime / 1000; // Convert from ms to s
            while (!match) {
                match = jsonData.activations[searchingBirthtime + '000'];
                searchingBirthtime = searchingBirthtime - 1;
            }
            console.log("match found!!! Sun: ", match.Sun);
            console.log("searchingBirthTime: ", searchingBirthtime);
            bodygraph.activations.Personality = match;

            let personalitySunPreciseDegrees = 0;

            // Gates
            let personalitySunGate = match.Sun.g;
            let personalitySunLine = match.Sun.l;
            let personalitySunColor = match.Sun.c;
            let personalitySunTone = match.Sun.t;
            let personalitySunBase = match.Sun.b;
            let i = 0;
            for (; i < 64; i++) {
                if (Gates.order[i] != personalitySunGate) {
                    personalitySunPreciseDegrees += 5.625;
                } else {
                    break;
                }
            }
            console.log('Gates added - P Sun precise degrees now ', personalitySunPreciseDegrees)
            // Lines
            i = 1;
            for (; i <= 6; i++) {
                if (personalitySunLine != i) {
                    personalitySunPreciseDegrees += 0.9375;
                } else {
                    break;
                }
            }
            console.log('Lines added - P Sun precise degrees now ', personalitySunPreciseDegrees)
            // Colors
            i = 1;
            for (; i <= 6; i++) {
                if (personalitySunColor != i) {
                    personalitySunPreciseDegrees += 0.15625;
                } else {
                    break;
                }
            }
            console.log('Colors added - P Sun precise degrees now ', personalitySunPreciseDegrees)

            // Tones
            i = 1;
            for (; i <= 6; i++) {
                if (personalitySunTone != i) {
                    personalitySunPreciseDegrees += 0.026041666666667;
                } else {
                    break;
                }
            }
            console.log('Tones added - P Sun precise degrees now ', personalitySunPreciseDegrees)

             // Bases
             i = 1;
             for (; i <= 5; i++) {
                 if (personalitySunBase != i) {
                     personalitySunPreciseDegrees += 0.00520833333;
                 } else {
                     break;
                 }
             }
             console.log('Bases added - P Sun precise degrees now ', personalitySunPreciseDegrees)

             personalitySunPreciseDegrees += 0.00520833333;
             console.log('Extra base added - P Sun precise degrees now ', personalitySunPreciseDegrees)

             let designSunPreciseDegrees = personalitySunPreciseDegrees - 88;
             if (designSunPreciseDegrees < 0) {
                 designSunPreciseDegrees += 360;
             }



             console.log('personalitySunPreciseDegrees', personalitySunPreciseDegrees);
             console.log('activation for personalitySunPreciseDegrees', getActivationFromDegrees(personalitySunPreciseDegrees));
             
             console.log('designSunPreciseDegrees', designSunPreciseDegrees);
             console.log('activation for designSunPreciseDegrees', getActivationFromDegrees(designSunPreciseDegrees));

             let designActivation = getActivationFromDegrees(designSunPreciseDegrees);

             let designSunGate = designActivation.g;
             let designSunLine = designActivation.l;
             let designSunColor = designActivation.c;
             let designSunTone = designActivation.t;
             let designSunBase = designActivation.b;

            console.log('design sun deets');
            console.log(designSunGate);
            console.log(designSunLine);
            console.log(designSunColor);
            console.log(designSunTone);
            console.log(designSunBase);
                        
            match = null;
            searchingBirthtime = birthtime - 7.949e+9; // Go back 92 days to begin searching
            console.log('searchingBirthtime:', searchingBirthtime);
            while (!match) {
                match = jsonData.activations[searchingBirthtime];
                if (match != null) {
                    if ((match.Sun.g == designSunGate) && 
                        (match.Sun.l == designSunLine) &&
                        (match.Sun.c == designSunColor) &&
                        (match.Sun.t == designSunTone) &&
                        (match.Sun.b == designSunBase)) {  
                          console.log("match found!!!", match);
                          bodygraph.activations.Design = match;
                          break;
                    } else {
                      match = null; // Keep going
                    }
                }
                searchingBirthtime = searchingBirthtime + 1000; // Move 1 second at a time
            }



  // Set Personality and Design Earth and SouthNode positions
  bodygraph.activations.Personality.Earth = {...bodygraph.activations.Personality.Sun};
  bodygraph.activations.Personality.Earth.g = oppositeGate(bodygraph.activations.Personality.Sun.g);
  bodygraph.activations.Personality.SouthNode = {...bodygraph.activations.Personality.NorthNode};
  bodygraph.activations.Personality.SouthNode.g = oppositeGate(bodygraph.activations.Personality.NorthNode.g);
  bodygraph.activations.Design.Earth = {...bodygraph.activations.Design.Sun};
  bodygraph.activations.Design.Earth.g = oppositeGate(bodygraph.activations.Design.Sun.g);
  bodygraph.activations.Design.SouthNode = {...bodygraph.activations.Design.NorthNode};
  bodygraph.activations.Design.SouthNode.g = oppositeGate(bodygraph.activations.Design.NorthNode.g);
 
  // Set some metadata about the Bodygraph
  bodygraph.profile = bodygraph.activations.Personality.Sun.l + "/" + bodygraph.activations.Design.Sun.l;

  var channels = [];
  let allActivations = [bodygraph.activations.Personality.Sun,
                                      bodygraph.activations.Personality.Earth,
                                      bodygraph.activations.Personality.NorthNode,
                                      bodygraph.activations.Personality.SouthNode,
                                      bodygraph.activations.Personality.Moon,
                                      bodygraph.activations.Personality.Mercury,
                                      bodygraph.activations.Personality.Mars,
                                      bodygraph.activations.Personality.Venus,
                                      bodygraph.activations.Personality.Jupiter,
                                      bodygraph.activations.Personality.Saturn,
                                      bodygraph.activations.Personality.Uranus,
                                      bodygraph.activations.Personality.Neptune,
                                      bodygraph.activations.Personality.Pluto,
                                      bodygraph.activations.Design.Sun,
                                      bodygraph.activations.Design.Earth,
                                      bodygraph.activations.Design.NorthNode,
                                      bodygraph.activations.Design.SouthNode,
                                      bodygraph.activations.Design.Moon,
                                      bodygraph.activations.Design.Mercury,
                                      bodygraph.activations.Design.Mars,
                                      bodygraph.activations.Design.Venus,
                                      bodygraph.activations.Design.Jupiter,
                                      bodygraph.activations.Design.Saturn,
                                      bodygraph.activations.Design.Uranus,
                                      bodygraph.activations.Design.Neptune,
                                      bodygraph.activations.Design.Pluto
                                    ];
  let allActivatedGates = {}; // Populate on the next line
  i = 0;
  for (; i < allActivations.length; i++) {
    allActivatedGates[allActivations[i].g] = "true";
    if (allActivatedGates[allActivations[i].g]) {
      bodygraph.activatedGates.push(allActivations[i].g + "");
    }
  } // End populating allActivatedGates and bodygraph.activatedGates

  // De-dupe bodygraph.activatedGates and save to bodygraph (also save allActivations array for convenience)
  bodygraph.activatedGates = [...new Set(bodygraph.activatedGates)];
  bodygraph.allActivations = allActivations;

  // Create personalityGates and designgs arrays
  bodygraph.activatedPersonalityGates = [bodygraph.activations.Personality.Sun.g,
                                      bodygraph.activations.Personality.Earth.g,
                                      bodygraph.activations.Personality.NorthNode.g,
                                      bodygraph.activations.Personality.SouthNode.g,
                                      bodygraph.activations.Personality.Moon.g,
                                      bodygraph.activations.Personality.Mercury.g,
                                      bodygraph.activations.Personality.Mars.g,
                                      bodygraph.activations.Personality.Venus.g,
                                      bodygraph.activations.Personality.Jupiter.g,
                                      bodygraph.activations.Personality.Saturn.g,
                                      bodygraph.activations.Personality.Uranus.g,
                                      bodygraph.activations.Personality.Neptune.g,
                                      bodygraph.activations.Personality.Pluto.g];

  bodygraph.activatedDesignGates = [bodygraph.activations.Design.Sun.g,
                                      bodygraph.activations.Design.Earth.g,
                                      bodygraph.activations.Design.NorthNode.g,
                                      bodygraph.activations.Design.SouthNode.g,
                                      bodygraph.activations.Design.Moon.g,
                                      bodygraph.activations.Design.Mercury.g,
                                      bodygraph.activations.Design.Mars.g,
                                      bodygraph.activations.Design.Venus.g,
                                      bodygraph.activations.Design.Jupiter.g,
                                      bodygraph.activations.Design.Saturn.g,
                                      bodygraph.activations.Design.Uranus.g,
                                      bodygraph.activations.Design.Neptune.g,
                                      bodygraph.activations.Design.Pluto.g
                                    ];

  // Iterate over all activations and construct channels array
  for (i = 0; i < allActivations.length; i++) {
    var gate = allActivations[i].g;
    for (var n = 0; n < harmonicGates[gate].length; n++) {
      if (allActivatedGates[harmonicGates[gate][n]]) {
        bodygraph.channels.push(Math.min(harmonicGates[gate][n], gate) + "-" + Math.max(harmonicGates[gate][n], gate));
      }
    }
  }

  // De-duplicate channels
  bodygraph.channels = [...new Set(bodygraph.channels)];

  // Sort the array
  // Note: This sorts alphabetically, so '29-46' comes before '9-52' since 2 is less than 9, alphabetically speaking.
  bodygraph.channels.sort();

  // Determine the activated centers
  for (i = 0; i < bodygraph.channels.length; i++) { // e.g. "29-46", "9-52"
    var channel = bodygraph.channels[i];
		console.log(`Channel ${channel} defined.`);
    for (n = 0; n < definedCentersByChannel[channel].length; n++) {
      bodygraph.definedCenters.push(definedCentersByChannel[channel][n]);
	  }
  };

  // De-duplicate activated centers
  bodygraph.definedCenters = [...new Set(bodygraph.definedCenters)];

  // Sort the array
  bodygraph.definedCenters.sort();

	console.log('Finished populating bodygraph.channels and bodygraph.definedCenters.');

  // Determine the Type based on channel definition and center activation
  if (bodygraph.channels.length == 0) {
    bodygraph.type = "Reflector";
  } else if (!bodygraph.definedCenters.includes("Sacral")) { // Projector or Manifestor
    if (motorToThroat(bodygraph.channels, bodygraph.definedCenters)) {
      bodygraph.type = "Manifestor";
    } else {
      bodygraph.type = "Projector";
    }
  } else { // Generator or Manifesting Generator
    if (motorToThroat(bodygraph.channels, bodygraph.definedCenters)) {
      bodygraph.type = "Manifesting Generator";
    } else {
      bodygraph.type = "Generator";
    }
  }
	console.log('Type: ' + bodygraph.type);

  // Set the authority
  if (bodygraph.definedCenters.length == 0) {
    bodygraph.authority = "Lunar";
  } else {
		var authorityHierarchy = ["Solar Plexus", "Sacral", "Spleen", "Ego", "G"];
		for (i = 0; i < authorityHierarchy.length; i++) {
		  if (bodygraph.definedCenters.includes(authorityHierarchy[i])) {
		    var authorityMap= {"Solar Plexus": "Emotional",
		                           "Sacral": "Sacral",
		                           "Spleen": "Splenic",
		                           "Ego": "Ego Projected",
		                           "G": "Self Projected"};
		    bodygraph.authority = authorityMap[authorityHierarchy[i]];
		    break;
		  }
		}
		if (bodygraph.authority == "") { // Still no match. Must be Mental Projector.
		    bodygraph.authority = "Sounding Board";
		}
	}
	console.log('Authority: ' + bodygraph.authority);

	// Determine the definition
	if (bodygraph.definedCenters.length == 0) {
		bodygraph.definition = "No Definition";
	} else if (bodygraph.definedCenters.length < 4) {
		bodygraph.definition = "Single Definition";
	} else { // Let's run the chart!

		console.log('More than 3 activated centers found: ' + bodygraph.definedCenters.length + ' activated centers found.');
		let areasOfDefinition = [];

		areasOfDefinition.push({}); // Create a new area of definition with index 0 and populate it with two centers
		areasOfDefinition[0][definedCentersByChannel[bodygraph.channels[0]][0]] = true;
		areasOfDefinition[0][definedCentersByChannel[bodygraph.channels[0]][1]] = true;
		for (i = 1; i < bodygraph.channels.length; i++) {
			console.log('Begin iterating over bodygraph channels...');
			if (areasOfDefinition.length == 1) {
				// If the first area of definition includes either center of this channel, add to first area of definition (0)
				if (areasOfDefinition[0][definedCentersByChannel[bodygraph.channels[i]][0]] ||
						areasOfDefinition[0][definedCentersByChannel[bodygraph.channels[i]][1]]) {
							areasOfDefinition[0][definedCentersByChannel[bodygraph.channels[i]][0]] = true;
							areasOfDefinition[0][definedCentersByChannel[bodygraph.channels[i]][1]] = true;
				} else { // Split found!
  					console.log('Split found! Creating a new area of definition...');
						areasOfDefinition.push({}); // Create a new area of definition
						areasOfDefinition[1][definedCentersByChannel[bodygraph.channels[i]][0]] = true;
						areasOfDefinition[1][definedCentersByChannel[bodygraph.channels[i]][1]] = true;
				}
			} else {
				let matchFound = false;
				for (n = 0; n < areasOfDefinition.length; n++) {
					if (areasOfDefinition[n][definedCentersByChannel[bodygraph.channels[i]][0]] ||
							areasOfDefinition[n][definedCentersByChannel[bodygraph.channels[i]][1]]) {
								areasOfDefinition[n][definedCentersByChannel[bodygraph.channels[i]][0]] = true;
								areasOfDefinition[n][definedCentersByChannel[bodygraph.channels[i]][1]] = true;
								matchFound = true;
								break;
					}
				}
				if (!matchFound) {
					areasOfDefinition.push({}); // Create a new area of definition
					areasOfDefinition[areasOfDefinition.length-1][definedCentersByChannel[bodygraph.channels[i]][0]] = true;
					areasOfDefinition[areasOfDefinition.length-1][definedCentersByChannel[bodygraph.channels[i]][1]] = true;
				}
			}
		} // End iterating over channels

		console.log('Switching on areas of definition length ...');

		switch (areasOfDefinition.length) {
			case 1:
				bodygraph.definition = "Single Definition";
				break;
			case 2:
				bodygraph.definition = "Split Definition";
				break;
			case 3:
				bodygraph.definition = "Triple Split Definition";
				break;
			case 4:
				bodygraph.definition = "Quad Split Definition";
		}

		if (bodygraph.definition == "Split Definition") { // Determine if wide split...
			// Convert activated centers in area of definition into an array
			let firstAreaOfDefinition = [Object.keys(areasOfDefinition[0])]; // String array of 2 or more defined centers
			let secondAreaOfDefinition = [Object.keys(areasOfDefinition[1])]; // String array of 2 or more defined centers

			let bridgingGateFound = false;
			for (i = 0; i < firstAreaOfDefinition.length; i++) {
				let firstDefinedCenter = firstAreaOfDefinition[i]; // e.g. "Ego", "G", "Solar Plexus" etc
					// Check if there are any adjacent centers from secondAreaOfDefinition
					// If so, check if there are bridging gates. (If not, wide split)
					// If not, it means at least one center separates the areas of definition and thus it is wide split.
					for (n = 0; n < secondAreaOfDefinition.length; n++) {
						let secondDefinedCenter = secondAreaOfDefinition[n]
							if (adjacentCenters[firstDefinedCenter] !== undefined && adjacentCenters[firstDefinedCenter][secondDefinedCenter]) {
								// Check if bridging gate
								let bridgingGates = bridgingGatesByCenter[firstDefinedCenter][secondDefinedCenter];
								for (let z = 0; z < bridgingGates.length; z++) {
									if (bodygraph.activatedGates.includes(bridgingGates[z])) { // match found!
										bridgingGateFound = true;
										break;
									}
								}
							}
						if (bridgingGateFound) break;
					}
				if (bridgingGateFound) break;
			}
			if (!bridgingGateFound) { // Since it's already set to "Split Definition" we only change it if there's no bridging gate
				bodygraph.definition = "Wide Split Definition"; // No bridging gate found, so wide split
			}
		} // End checking if split definition
	} // End else (4 or more activated centers)

	console.log('Definition: ' + bodygraph.definition);


		// Circuitry
		let circuitries = [];
		for (i = 0; i < bodygraph.channels.length; i++) {
			bodygraph.circuitries.push(circuitryByChannel[bodygraph.channels[i]]);
		}
		bodygraph.circuitries = [...new Set(bodygraph.circuitries)]; 		// De-duplicate channels

		console.log('Circuitry: ' + bodygraph.circuitries.toString());

		// Variable
		bodygraph.variable = "P";
		bodygraph.variable += bodygraph.activations.Personality.Sun.t < 4 ? "L" : "R";
		bodygraph.variable += bodygraph.activations.Personality.NorthNode.t < 4 ? "L" : "R";
		bodygraph.variable += " D";
		bodygraph.variable += bodygraph.activations.Design.Sun.t < 4 ? "L" : "R";
		bodygraph.variable += bodygraph.activations.Design.SouthNode.t < 4 ? "L" : "R";
		console.log('Variable: ' + bodygraph.variable);


  // TODO: Undefined centers
  // TODO: Incarnation Cross

        }); // end json().then()
      }); // end fetch().then()


      return bodygraph;
}

var adjacentCenters = {
	"Head": {
			"Ajna": true
	},
	"Ajna": {
		"Head": true,
		"Throat": true
	},
	"Throat": {
		"Ajna": true,
		"Solar Plexus": true,
		"Ego": true,
		"G": true,
		"Sacral": true,
		"Spleen": true
	},
	"Solar Plexus": {
		"Throat": true,
		"Ego": true,
		"Sacral": true,
		"Root": true
	},
	"Ego": {
		"Throat": true,
		"Solar Plexus": true,
		"G": true,
		"Spleen": true
	},
	"G": {
		"Thoat": true,
		"Ego": true,
		"Sacral": true,
		"Spleen": true
	},
	"Spleen": {
		"Throat": true,
		"G": true,
		"Ego": true,
		"Sacral": true,
		"Root": true
	},
	"Sacral": {
		"Throat": true,
		"G": true,
		"Solar Plexus": true,
		"Spleen": true,
		"Root": true
	},
	"Root": {
		"Spleen": true,
		"Sacral": true,
		"Solar Plexus": true
	}
}

var bridgingGatesByCenter = {
	"Head": {
			"Ajna": [64, 61, 63, 47, 24, 4]
	},
	"Ajna": {
		"Head": [64, 61, 63, 47, 24, 4],
		"Throat": [17, 43, 11, 62, 23, 56]
	},
	"Throat": {
		"Ajna": [17, 43, 11, 62, 23, 56],
		"Solar Plexus": [35, 36, 12, 22],
		"Ego": [45, 21],
		"G": [31, 8, 33, 7, 1, 13, 10],
		"Sacral": [34, 20],
		"Spleen": [57, 20]
	},
	"Solar Plexus": {
		"Throat": [35, 36, 12, 22],
		"Ego": [37, 40],
		"Sacral": [6, 59],
		"Root": [19, 49, 39, 55, 41, 30]
	},
	"Ego": {
		"Throat": [45, 21],
		"Solar Plexus": [37, 40],
		"G": [25, 51],
		"Spleen": [26, 44]
	},
	"G": {
		"Thoat": [31, 8, 33, 7, 1, 13, 10],
		"Ego": [25, 51],
		"Sacral": [15, 2, 46, 10, 34],
		"Spleen": [57, 10]
	},
	"Spleen": {
		"Throat": [57, 20],
		"G": [57, 10],
		"Ego": [26, 44],
		"Sacral": [42, 3, 9, 53, 60, 52],
		"Root": [32, 54, 28, 38, 18, 58]
	},
	"Sacral": {
		"Throat": [34, 20],
		"G": [15, 2, 46, 10, 34],
		"Solar Plexus": [6, 59],
		"Spleen": [50, 27, 34, 57],
		"Root": [42, 3, 9, 53, 60, 52]
	},
	"Root": {
		"Spleen": [32, 54, 28, 38, 18, 58],
		"Sacral": [42, 3, 9, 53, 60, 52],
		"Solar Plexus": [19, 49, 39, 55, 41, 30]
	}
}

export const circuitryByChannel = {
	"1-8": "Individual",
	"2-14": "Individual",
	"3-60": "Individual",
	"4-63": "Collective Logic",
	"5-15": "Collective Logic",
	"6-59": "Tribal",
	"7-31": "Collective Logic",
	"9-52": "Collective Logic",
	"10-20": "Individual",
	"10-34": "Individual",
	"10-57": "Individual",
	"11-56": "Collective Abstract",
	"12-22": "Individual",
	"13-33": "Collective Abstract",
	"16-48": "Collective Logic",
	"17-62": "Collective Logic",
	"18-58": "Collective Logic",
	"19-49": "Tribal",
	"20-34": "Individual",
	"20-57": "Individual",
	"21-45": "Tribal",
	"23-43": "Individual",
	"24-61": "Individual",
	"25-51": "Individual",
	"26-44": "Tribal",
	"27-50": "Tribal",
	"28-38": "Individual",
	"29-46": "Collective Abstract",
	"30-41": "Collective Abstract",
	"32-54": "Tribal",
	"34-57": "Individual",
	"35-36": "Collective Abstract",
	"37-40": "Tribal",
	"39-55": "Individual",
	"42-53": "Collective Abstract",
	"47-64": "Collective Abstract"
}
export const definedCentersByChannel = {
	"1-8": ["G", "Throat"],
	"2-14": ["Sacral", "G"],
	"3-60": ["Root", "Sacral"],
	"4-63": ["Head", "Ajna"],
	"5-15": ["Sacral", "G"],
	"6-59": ["Sacral", "Solar Plexus"],
	"7-31": ["G", "Throat"],
	"9-52": ["Root", "Sacral"],
	"10-20": ["G", "Throat"],
	"10-34": ["G", "Sacral"],
	"10-57": ["G", "Spleen"],
	"11-56": ["Ajna", "Throat"],
	"12-22": ["Throat", "Solar Plexus"],
	"13-33": ["G", "Throat"],
	"16-48": ["Spleen", "Throat"],
	"17-62": ["Ajna", "Throat"],
	"18-58": ["Root", "Spleen"],
	"19-49": ["Root", "Solar Plexus"],
	"20-34": ["Throat", "Sacral"],
	"20-57": ["Throat", "Spleen"],
	"21-45": ["Ego", "Throat"],
	"23-43": ["Ajna", "Throat"],
	"24-61": ["Head", "Ajna"],
	"25-51": ["Ego", "Throat"],
	"26-44": ["Spleen", "Ego"],
	"27-50": ["Spleen", "Sacral"],
	"28-38": ["Spleen", "Root"],
	"29-46": ["Sacral", "G"],
	"30-41": ["Root", "Solar Plexus"],
	"32-54": ["Root", "Spleen"],
	"34-57": ["Sacral", "Spleen"],
	"35-36": ["Solar Plexus", "Throat"],
	"37-40": ["Ego", "Solar Plexus"],
	"39-55": ["Root", "Solar Plexus"],
	"42-53": ["Root", "Sacral"],
	"47-64": ["Head", "Ajna"]
}

export const harmonicGates = {
	1: [8],
	2: [14],
	3: [60],
	4: [63],
	5: [15],
	6: [59],
	7: [31],
	8: [1],
	9: [52],
	10: [20, 34, 57],
	11: [56],
	12: [22],
	13: [33],
	14: [2],
	15: [5],
	16: [48],
	17: [62],
	18: [58],
	19: [49],
	20: [10, 34, 57],
	21: [45],
	22: [12],
	23: [43],
	24: [61],
	25: [51],
	26: [44],
	27: [50],
	28: [38],
	29: [46],
	30: [41],
	31: [7],
	32: [54],
	33: [13],
	34: [10, 20, 57],
	35: [36],
	36: [35],
	37: [40],
	38: [28],
	39: [55],
	40: [37],
	41: [30],
	42: [53],
	43: [23],
	44: [26],
	45: [21],
	46: [29],
	47: [64],
	48: [16],
	49: [19],
	50: [27],
	51: [25],
	52: [9],
	53: [42],
	54: [32],
	55: [39],
	56: [11],
	57: [10, 20, 34],
	58: [18],
	59: [6],
	60: [3],
	61: [24],
	62: [17],
	63: [4],
	64: [47]
}

export const Gates 		= {
	order: [41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8,
			20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6,
			46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60]
}

export function motorToThroat(channels, definedCenters) {
	if (!definedCenters.some(e => /Throat/.test(e)) || !definedCenters.some(e => /Solar Plexus|Sacral|Root|Ego/.test(e))) {
		return false; // Throat undefined and/or no motor defined
	}

	// Solar Plexus
	if (definedCenters.some(e => /Solar Plexus/.test(e))) {
		if (channels.some(e => /12-22|35-36/.test(e))) {
			return true;
		}
	}

	// Sacral
	if (definedCenters.some(e => /Sacral/.test(e))) {
		if (channels.some(e => /20-34/.test(e))) {
			return true;
		}
		if (channels.some(e => /2-14|5-15|29-46/.test(e))) { // G Center is defined
			if (channels.some(e => /1-8|7-31|10-20|13-33/.test(e))) {
				return true;
			}
		}
		if (channels.some(e => /27-50/.test(e))) { // Spleen is defined
			if (channels.some(e => /16-48|20-57/.test(e))) {
				return true;
			}
			if (channels.some(e => /10-57/.test(e))) { // G Center is defined
				if (channels.some(e => /1-8|7-31|10-20|13-33/.test(e))) {
					return true;
				}
			}
		}
	}

	// Ego
	if (definedCenters.some(e => /Ego/.test(e))) {
		if (channels.some(e => /21-45/.test(e))) {
			return true;
		}
		if (channels.some(e => /25-51/.test(e))) { // G Center is defined
			if (channels.some(e => /1-8|7-31|10-20|13-33/.test(e))) {
				return true;
			}
			if (channels.some(e => /10-57/.test(e))) { // Spleen is defined
				if (channels.some(e => /16-48|20-57/.test(e))) {
					return true;
				}
			}
		}
		if (channels.some(e => /26-44/.test(e))) { // Spleen is defined
			if (channels.some(e => /16-48|20-57/.test(e))) {
				return true;
			}
		}
	}

	// Root
	if (definedCenters.some(e => /Root/.test(e))) {
		if (channels.some(e => /18-58|28-38|32-54/.test(e))) { // Spleen is defined
			if (channels.some(e => /16-48|20-57/.test(e))) {
				return true;
			}
		}
		if (channels.some(e => /10-57/.test(e))) { // G Center is defined
			if (channels.some(e => /1-8|7-31|10-20|13-33/.test(e))) {
				return true;
			}
		}
	}
	return false;
}
