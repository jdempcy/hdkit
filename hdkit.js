// MIT License

// Copyright (c) 2016-2023 Jonah Dempcy

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const HDKit = {

  // TODO: Add constructor function for new Bodygraph()

}

// Helpers

// Returns true if planet is in either gate or its harmonic
function isFixed(gate, planet, personalityEntry) {
  const integrationGates = [34, 20, 10, 57];
  const fixingPlanetGate = personalityEntry[planet.trim()].g;
  if (fixingPlanetGate == gate || fixingPlanetGate == harmonicGate(gate)
    || (integrationGates.includes(gate) && integrationGates.includes(fixingPlanetGate))) {
    return true;
  }
  return false;
}

function oppositeGate(gate) {
  const index = gateOrder.indexOf(gate);
  const oppositeIndex = (index + 32) % gateOrder.length;
  return gateOrder[oppositeIndex];
}

function harmonicGate(gate) {
  const index = gateOrder.indexOf(gate);
  return harmonicOrder[index];
}

// e.g. 41 -> 19
function nextGate(gate) {
  const index = gateOrder.indexOf(gate);
  return gateOrder[(index + 1) % gateOrder.length];
}

// e.g. 2 -> 3
function nextLine(line) {
  return line === 6 ? 1 : line + 1;
}

// e.g. 41, 6 -> '19.1'
function nextGateAndLine(gate, line) {
  return line === 6 ? nextGate(gate) + '.' + nextLine(line) : gate + '.' + nextLine(line);
}
