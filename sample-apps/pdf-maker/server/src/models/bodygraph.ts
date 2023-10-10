import * as crypto from "crypto";
import { DefinedCentersByChannel, Activation, AllActivatedGates, AuthorityMap, Bodygraph, HarmonicGates } from "../types";

// Swiss Ephemeris configuration
const swisseph = require ('swisseph');
const flag = swisseph.SEFLG_SPEED;
swisseph.swe_set_ephe_path (__dirname + './ephemeris');

// The main function: creating a new bodygraph
export function createBodygraph(name:string, date:Date, location:string) {
  // Create a new Bodygraph that we will fill with values from querying the Swiss Ephemeris.
  const bodygraph: Bodygraph = {
    name: name,
    id: crypto.randomBytes(8).toString("hex"),
    birthDateAndTime: date.toUTCString(),
		location: location,

    // Everything past this point is populated by swisseph calls and utility methods below
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

  // Store sun position in decimal degrees
  var personalitySunLongitude: number = -1;

  // Configure Swiss Epehemeris for Julian Day and begin collecting positions
  swisseph.swe_julday (date.getUTCFullYear(),
                       date.getUTCMonth() + 1, // Months are 1 higher in swisseph than their index (e.g. September has index of 8 and number of 9)
                       date.getUTCDate(),
                       (date.getUTCHours() + (date.getUTCMinutes() / 60)),
                       swisseph.SE_GREG_CAL, function (julday_ut:any) {

    swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (body:any) {
      console.log("P-SUN: " + decimalDegreesToDMS(body.longitude).displayString);
      personalitySunLongitude = body.longitude; // This is used later when finding the 88º retrograde point of the Sun
      bodygraph.activations.Personality.Sun = getActivationFromDecimalDegrees(body.longitude);
      var earthPosition:number = body.longitude += 180;
      if (earthPosition >= 360) {
        earthPosition -= 360;
      }
      bodygraph.activations.Personality.Earth = getActivationFromDecimalDegrees(earthPosition);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_TRUE_NODE, flag, function (body:any) {
      console.log("P-NORTH NODE: " + decimalDegreesToDMS(body.longitude).displayString);
      bodygraph.activations.Personality.NorthNode = getActivationFromDecimalDegrees(body.longitude);
      var southNodePosition:number = body.longitude += 180;
      if (southNodePosition >= 360) {
        southNodePosition -= 360;
      }
      bodygraph.activations.Personality.SouthNode = getActivationFromDecimalDegrees(southNodePosition);
    });

    // swisseph.swe_calc_ut (julday_ut, swisseph.SE_MEAN_NODE, flag, function (body:any) {
    // 	console.log ('Mean node position:', body);
    // });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body:any) {
      bodygraph.activations.Personality.Moon = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_MERCURY, flag, function (body:any) {
      bodygraph.activations.Personality.Mercury = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_VENUS, flag, function (body:any) {
      bodygraph.activations.Personality.Venus = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_MARS, flag, function (body:any) {
      bodygraph.activations.Personality.Mars = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_JUPITER, flag, function (body:any) {
      bodygraph.activations.Personality.Jupiter = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_SATURN, flag, function (body:any) {
      bodygraph.activations.Personality.Saturn = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_URANUS, flag, function (body:any) {
      bodygraph.activations.Personality.Uranus = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_NEPTUNE, flag, function (body:any) {
      bodygraph.activations.Personality.Neptune = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_PLUTO, flag, function (body:any) {
      bodygraph.activations.Personality.Pluto = getActivationFromDecimalDegrees(body.longitude);
    });
  });

  // Do it again for Design side

  // Start by creating a date object for the actual birth time
  var designDate = new Date(date);

  // Now adjust this designDate object by an arbitrary amount,
  // retrograde the Sun's motion by 88º.

  // Because we cannot use a fixed date offset (it fluctuates)
  // we must employ a search tree...

  // var dateOffset:number = 7814940000; // offset in milliseconds
  // ^ This doesn't work unfortunately :(

  // We'll just go back early enough and increment
  // little by little until we get to 88º...

  // So... let's begin our search! We'll start by looking 92 days before.
  // And we'll move forward in 1 hour increments and see how close this gets us :)

  var searchingDate = new Date(date);
  searchingDate.setTime(searchingDate.getTime() - 7.949e+9);

  // Continue to fetch Sun position until it is less than 88 degrees
  // from the original position

  console.log ("Personality Sun Longitude: ", personalitySunLongitude);
  var searchingSunLongitude: number;
  var offset:number;

  if (personalitySunLongitude > 87) { // If it's 88º or higher
    offset = 89;
    while (offset > 88) {
      swisseph.swe_julday (searchingDate.getUTCFullYear(),
                           searchingDate.getUTCMonth() + 1, // Months are 1 higher in swisseph than their index (e.g. September has index of 8 and number of 9)
                           searchingDate.getUTCDate(),
                           (searchingDate.getUTCHours() + (searchingDate.getUTCMinutes() / 60)),
                           swisseph.SE_GREG_CAL, function (julday_ut:any) {


         swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (body:any) {
           searchingSunLongitude = body.longitude;
           offset = Math.abs(personalitySunLongitude - searchingSunLongitude);
           if (offset > 88) {
             searchingDate.setTime(searchingDate.getTime() + 10000);
           }
         });
       });
    }
  } else { // Less than 88º
    offset = 271;
    while (offset < 272) {

      swisseph.swe_julday (searchingDate.getUTCFullYear(),
                           searchingDate.getUTCMonth() + 1, // Months are 1 higher in swisseph than their index (e.g. September has index of 8 and number of 9)
                           searchingDate.getUTCDate(),
                           (searchingDate.getUTCHours() + (searchingDate.getUTCMinutes() / 60)),
                           swisseph.SE_GREG_CAL, function (julday_ut:any) {


         swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (body:any) {
           searchingSunLongitude = body.longitude;
           offset = Math.abs(personalitySunLongitude - searchingSunLongitude);
           if (offset < 272) {
             searchingDate.setTime(searchingDate.getTime() + 10000);
           }
         });
       });
    }
  }

  designDate.setTime(searchingDate.getTime());

  // Repeat the calculations above for the Design side to finish populating the Bodygraph...
  swisseph.swe_julday (designDate.getUTCFullYear(),
                       designDate.getUTCMonth() + 1, // Months are 1 higher in swisseph than their index (e.g. September has index of 8 and number of 9)
                       designDate.getUTCDate(),
                       (designDate.getUTCHours() + (designDate.getUTCMinutes() / 60)),
                       swisseph.SE_GREG_CAL, function (julday_ut:any) {
    console.log('Design date:', designDate)

    swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (body:any) {
      console.log("D-SUN: " + decimalDegreesToDMS(body.longitude).displayString);
      bodygraph.activations.Design.Sun = getActivationFromDecimalDegrees(body.longitude);
      var earthPosition:number = body.longitude += 180;
      if (earthPosition >= 360) {
        earthPosition -= 360;
      }
      bodygraph.activations.Design.Earth = getActivationFromDecimalDegrees(earthPosition);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_TRUE_NODE, flag, function (body:any) {
      console.log("D-NORTH NODE: " + decimalDegreesToDMS(body.longitude).displayString);
      bodygraph.activations.Design.NorthNode = getActivationFromDecimalDegrees(body.longitude);
      var southNodePosition:number = body.longitude += 180;
      if (southNodePosition >= 360) {
        southNodePosition -= 360;
      }
      bodygraph.activations.Design.SouthNode = getActivationFromDecimalDegrees(southNodePosition);
    });

    // swisseph.swe_calc_ut (julday_ut, swisseph.SE_MEAN_NODE, flag, function (body:any) {
    // 	console.log ('Mean node position:', body);
    // });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body:any) {
      bodygraph.activations.Design.Moon = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_MERCURY, flag, function (body:any) {
      bodygraph.activations.Design.Mercury = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_VENUS, flag, function (body:any) {
      bodygraph.activations.Design.Venus = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_MARS, flag, function (body:any) {
      bodygraph.activations.Design.Mars = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_JUPITER, flag, function (body:any) {
      bodygraph.activations.Design.Jupiter = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_SATURN, flag, function (body:any) {
      bodygraph.activations.Design.Saturn = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_URANUS, flag, function (body:any) {
      bodygraph.activations.Design.Uranus = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_NEPTUNE, flag, function (body:any) {
      bodygraph.activations.Design.Neptune = getActivationFromDecimalDegrees(body.longitude);
    });

    swisseph.swe_calc_ut (julday_ut, swisseph.SE_PLUTO, flag, function (body:any) {
      bodygraph.activations.Design.Pluto = getActivationFromDecimalDegrees(body.longitude);
    });
  });

  // Set some metadata about the Bodygraph
  bodygraph.profile = bodygraph.activations.Personality.Sun.Line + "/" + bodygraph.activations.Design.Sun.Line;

  var channels:Array<string> = [];
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
  let allActivatedGates: AllActivatedGates = {}; // Populate on the next line
  for (var i = 0; i < allActivations.length; i++) {
    allActivatedGates[allActivations[i].Gate] = "true";
    if (allActivatedGates[allActivations[i].Gate]) {
      bodygraph.activatedGates.push(allActivations[i].Gate + "");
    }
		console.log(`Gate ${allActivations[i].Gate} activated.`);
  } // End populating allActivatedGates and bodygraph.activatedGates
  console.log('Finished populating allActivatedGates and bodygraph.activatedGates.');

  // De-dupe bodygraph.activatedGates and save to bodygraph (also save allActivations array for convenience)
  bodygraph.activatedGates = [...new Set(bodygraph.activatedGates)];
  bodygraph.allActivations = allActivations;

  // Create personalityGates and designGates arrays
  bodygraph.activatedPersonalityGates = [bodygraph.activations.Personality.Sun.Gate,
                                      bodygraph.activations.Personality.Earth.Gate,
                                      bodygraph.activations.Personality.NorthNode.Gate,
                                      bodygraph.activations.Personality.SouthNode.Gate,
                                      bodygraph.activations.Personality.Moon.Gate,
                                      bodygraph.activations.Personality.Mercury.Gate,
                                      bodygraph.activations.Personality.Mars.Gate,
                                      bodygraph.activations.Personality.Venus.Gate,
                                      bodygraph.activations.Personality.Jupiter.Gate,
                                      bodygraph.activations.Personality.Saturn.Gate,
                                      bodygraph.activations.Personality.Uranus.Gate,
                                      bodygraph.activations.Personality.Neptune.Gate,
                                      bodygraph.activations.Personality.Pluto.Gate];

  bodygraph.activatedDesignGates = [bodygraph.activations.Design.Sun.Gate,
                                      bodygraph.activations.Design.Earth.Gate,
                                      bodygraph.activations.Design.NorthNode.Gate,
                                      bodygraph.activations.Design.SouthNode.Gate,
                                      bodygraph.activations.Design.Moon.Gate,
                                      bodygraph.activations.Design.Mercury.Gate,
                                      bodygraph.activations.Design.Mars.Gate,
                                      bodygraph.activations.Design.Venus.Gate,
                                      bodygraph.activations.Design.Jupiter.Gate,
                                      bodygraph.activations.Design.Saturn.Gate,
                                      bodygraph.activations.Design.Uranus.Gate,
                                      bodygraph.activations.Design.Neptune.Gate,
                                      bodygraph.activations.Design.Pluto.Gate
                                    ];

  // Iterate over all activations and construct channels array
  for (i = 0; i < allActivations.length; i++) {
    var gate:number = allActivations[i].Gate;
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
    var channel:string = bodygraph.channels[i];
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
		var authorityHierarchy:Array<string> = ["Solar Plexus", "Sacral", "Spleen", "Ego", "G"];
		for (i = 0; i < authorityHierarchy.length; i++) {
		  if (bodygraph.definedCenters.includes(authorityHierarchy[i])) {
		    var authorityMap:AuthorityMap = {"Solar Plexus": "Emotional",
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
		let areasOfDefinition:Array<any> = [];

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
				let matchFound:boolean = false;
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
			let firstAreaOfDefinition:any = [Object.keys(areasOfDefinition[0])]; // String array of 2 or more defined centers
			let secondAreaOfDefinition:any = [Object.keys(areasOfDefinition[1])]; // String array of 2 or more defined centers

			let bridgingGateFound:boolean = false;
			for (i = 0; i < firstAreaOfDefinition.length; i++) {
				let firstDefinedCenter = firstAreaOfDefinition[i]; // e.g. "Ego", "G", "Solar Plexus" etc
					// Check if there are any adjacent centers from secondAreaOfDefinition
					// If so, check if there are bridging gates. (If not, wide split)
					// If not, it means at least one center separates the areas of definition and thus it is wide split.
					for (n = 0; n < secondAreaOfDefinition.length; n++) {
						let secondDefinedCenter = secondAreaOfDefinition[n]
							if (adjacentCenters[firstDefinedCenter] !== undefined && adjacentCenters[firstDefinedCenter][secondDefinedCenter]) {
								// Check if bridging gate
								let bridgingGates:Array<string> = bridgingGatesByCenter[firstDefinedCenter][secondDefinedCenter];
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
		let circuitries:Array<string> = [];
		for (i = 0; i < bodygraph.channels.length; i++) {
			bodygraph.circuitries.push(circuitryByChannel[bodygraph.channels[i]]);
		}
		bodygraph.circuitries = [...new Set(bodygraph.circuitries)]; 		// De-duplicate channels

		console.log('Circuitry: ' + bodygraph.circuitries.toString());

		// Variable
		bodygraph.variable = "P";
		bodygraph.variable += bodygraph.activations.Personality.Sun.Tone < 4 ? "L" : "R";
		bodygraph.variable += bodygraph.activations.Personality.NorthNode.Tone < 4 ? "L" : "R";
		bodygraph.variable += " D";
		bodygraph.variable += bodygraph.activations.Design.Sun.Tone < 4 ? "L" : "R";
		bodygraph.variable += bodygraph.activations.Design.SouthNode.Tone < 4 ? "L" : "R";
		console.log('Variable: ' + bodygraph.variable);


  // TODO: Undefined centers
  // TODO: Incarnation Cross

  return bodygraph;
}
var adjacentCenters:any = {
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

var bridgingGatesByCenter:any = {
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


// Static data
export const circuitryByChannel:any = {
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
export const definedCentersByChannel:DefinedCentersByChannel = {
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

export const harmonicGates:HarmonicGates = {
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

// Utility methods
export function decimalDegreesToDMS(decimalDegrees: string) { // e.g. 128.22903474504145
	// Decimal degrees to degrees, minutes, seconds
	var degrees:number = Math.floor(parseInt(decimalDegrees));
	var degreesFloat:number = parseFloat(decimalDegrees);
	var minutes:number = Math.floor((degreesFloat - degrees) * 60);
	var seconds:number = Math.round((degreesFloat - degrees - minutes/60) * 3600);

	return {
		'degrees': degrees,
		'minutes': minutes,
		'seconds': seconds,
		'displayString': degrees + 'º' + minutes + '\'' + seconds + '\"'
	};
}

export function getActivationFromDecimalDegrees(decimalDegrees: any) {
	var degreesFloat:number = parseFloat(decimalDegrees);

		  // Human Design gates start at Gate 41 at 02º00'00" Aquarius, so we have to adjust from 00º00'00" Aries.
			// The distance is 58º00'00" exactly.
	degreesFloat += 58;
	if (degreesFloat >= 360) {
		degreesFloat -= 360;
	}

	var percentageThrough:number = degreesFloat / 360;  // e.g. 182.3705 becomes 0.5065
	var exactLine = 384 * percentageThrough;
	var exactColor = 2304 * percentageThrough;
	var exactTone = 13824 * percentageThrough;
	var exactBase = 69120 * percentageThrough; // e.g. 46151

  return {
		Gate: (Gates.order[Math.floor(percentageThrough * 64)]),
		Line: Math.floor((exactLine % 6) + 1),
		Color: Math.floor((exactColor % 6) + 1),
		Tone: Math.floor((exactTone % 6) + 1),
		Base: Math.floor((exactBase % 5) + 1)
	}
}

// Bodygraph-specific methods
export function motorToThroat(channels: Array<string>, definedCenters: Array<string>) {
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
