
// Position the planets in the Rave Mandala
const raveMandalaGatePositions = {
  1: { left: 578, top: 165 },
  2: { left: 198, top: 602 },
  3: { left: 142, top: 539 },
  4: { left: 627, top: 553 },
  5: { left: 627, top: 552 },
  6: { left: 679, top: 392 },
  7: { left: 606, top: 572 },
  8: { left: 244, top: 637 },
  9: { left: 479, top: 106 },
  10: { left: 367, top: 92 },
  11: { left: 395, top: 92 },
  12: { left: 381, top: 674 },
  13: { left: 168, top: 192 },
  14: { left: 532, top: 130 },
  15: { left: 410, top: 674 },
  16: { left: 296, top: 662 },
  17: { left: 101, top: 433 },
  18: { left: 675, top: 334 },
  19: { left: 175, top: 188 },
  20: { left: 270, top: 649 },
  21: { left: 107, top: 462 },
  22: { left: 99, top: 348 },
  23: { left: 219, top: 622 },
  24: { left: 178, top: 583 },
  25: { left: 97, top: 405 },
  26: { left: 424, top: 95 },
  27: { left: 158, top: 563 },
  28: { left: 618, top: 203 },
  29: { left: 640, top: 527 },
  30: { left: 135, top: 241 },
  31: { left: 566, top: 613 },
  32: { left: 648, top: 253 },
  33: { left: 590, top: 595 },
  34: { left: 506, top: 118 },
  35: { left: 324, top: 668 },
  36: { left: 96, top: 377 },
  37: { left: 111, top: 292 },
  38: { left: 311, top: 103 },
  39: { left: 465, top: 661 },
  40: { left: 663, top: 475 },
  41: { left: 209, top: 155 },
  42: { left: 128, top: 514 },
  43: { left: 556, top: 145 },
  44: { left: 601, top: 183 },
  45: { left: 352, top: 673 },
  46: { left: 679, top: 362 },
  47: { left: 677, top: 420 },
  48: { left: 668, top: 307 },
  49: { left: 150, top: 216 },
  50: { left: 631, top: 231 },
  51: { left: 116, top: 488 },
  52: { left: 437, top: 670 },
  53: { left: 492, top: 653 },
  54: { left: 285, top: 114 },
  55: { left: 120, top: 266 },
  56: { left: 543, top: 630 },
  57: { left: 658, top: 279 },
  58: { left: 338, top: 96 },
  59: { left: 653, top: 502 },
  60: { left: 232, top: 139 },
  61: { left: 257, top: 125 },
  62: { left: 518, top: 643 },
  63: { left: 103, top: 320 },
  64: { left: 667, top: 447 }
};

const gateCount = {}; // Keep track of how many times a gate appears

'sun earth north-node south-node moon mercury venus mars jupiter saturn uranus neptune pluto'.split(' ').forEach((planet) => {
  const designPlanetElement = document.getElementById(`rave-mandala-design-${planet}`);
  const personalityPlanetElement = document.getElementById(`rave-mandala-personality-${planet}`);

  planet = {
    'sun': 'Sun',
    'earth': 'Earth',
    'north-node': 'NorthNode',
    'south-node': 'SouthNode',
    'moon': 'Moon',
    'mercury': 'Mercury',
    'venus': 'Venus',
    'mars': 'Mars',
    'jupiter': 'Jupiter',
    'saturn': 'Saturn',
    'uranus': 'Uranus',
    'neptune': 'Neptune',
    'pluto': 'Pluto',
  }[planet];

  let designGate;
  let personalityGate;
  if (planet == 'Earth') {
    designGate = oppositeGate(designActivations['Sun'].g);
    personalityGate = oppositeGate(personalityActivations['Sun'].g);
  } else if (planet == 'SouthNode') {
    designGate = oppositeGate(designActivations['NorthNode'].g);
    personalityGate = oppositeGate(personalityActivations['NorthNode'].g);
  } else {
    designGate = designActivations[planet].g;
    personalityGate = personalityActivations[planet].g
  }

  let designGateOffset;
  if (!gateCount[designGate]) {
    gateCount[designGate] = 1;
    designGateOffset = 0;
  } else {
    gateCount[designGate]++;
    designGateOffset = (gateCount[designGate] - 1) * 28;
  }

  let personalityGateOffset;
  if (!gateCount[personalityGate]) {
    gateCount[personalityGate] = 1;
    personalityGateOffset = 0;
  } else {
    gateCount[personalityGate]++;
    personalityGateOffset = (gateCount[personalityGate] - 1) * 28;
  }

  const bottomGates = [25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6];
  const leftGates = [13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2]; // Unused
  const rightGates = [1, 44, 28, 50, 32, 57, 48, 18, 46, 6, 47, 64, 40, 59, 29, 4, 7]; // Unused

  let designGateTopOffset = designGateOffset;
  if (bottomGates.includes(designGate)) {
    designGateTopOffset = -designGateOffset;
  }

  let personalityGateTopOffset = personalityGateOffset;
  if (bottomGates.includes(personalityGate)) {
    personalityGateTopOffset = -personalityGateOffset;
  }

  const designGatePosition = raveMandalaGatePositions[designGate];
  const personalityGatePosition = raveMandalaGatePositions[personalityGate];
  designPlanetElement.style.position = 'absolute';
  designPlanetElement.style.left = `${designGatePosition.left}px`;
  designPlanetElement.style.top = `${designGatePosition.top + designGateTopOffset}px`;
  designPlanetElement.style.background = '#efefef';
  designPlanetElement.style.padding = '3px';
  designPlanetElement.style.borderRadius = '50%';
  designPlanetElement.style.border = '1px solid #ccc';
  designPlanetElement.style.boxShadow = '2px 2px 2px 1px rgba(0, 0, 0, 0.2)';

  personalityPlanetElement.style.position = 'absolute';
  personalityPlanetElement.style.left = `${personalityGatePosition.left}px`;
  personalityPlanetElement.style.top = `${personalityGatePosition.top + personalityGateTopOffset}px`;
  personalityPlanetElement.style.background = '#efefef';
  personalityPlanetElement.style.padding = '3px';
  personalityPlanetElement.style.borderRadius = '50%';
  personalityPlanetElement.style.border = '1px solid #ccc';
  personalityPlanetElement.style.boxShadow = '2px 2px 2px 1px rgba(0, 0, 0, 0.2)';
});
