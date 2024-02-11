// NOTE: This is a Chat GPT conversion of a Ruby class. 
// There are some errors it introduced that need to be corrected. 
// It is shown here for example purposes only.  --Jonah


class BodygraphData {
  constructor(personality_activations, design_activations) {
    this.personality_activations = personality_activations;
    this.design_activations = design_activations;
    this.all_gate_activations = this.allGateActivations(personality_activations, design_activations);
  }

  auraType() {
    if (this.sacralDefined()) {
      return this.motorToThroat() ? 'Manifesting Generator' : 'Generator';
    } else if (this.motorToThroat()) {
      return 'Manifestor';
    } else if (this.noCentersDefined()) {
      return 'Reflector';
    } else {
      return 'Projector';
    }
  }

  innerAuthority() {
    if (this.solarPlexusDefined()) {
      return 'Solar Plexus';
    } else if (this.sacralDefined()) {
      return 'Sacral';
    } else if (this.spleenDefined()) {
      return 'Spleen';
    } else if (this.egoToThroat() || this.gToEgo()) {
      return 'Ego';
    } else if (this.gToThroat()) {
      return 'Self Projected';
    } else if (this.headToAjna() || this.ajnaToThroat()) {
      return 'Outer Authority';
    } else {
      return 'Lunar';
    }
  }

  definition() {
    let areasOfDefinition = {
      1: [],
      2: [],
      3: [],
      4: []
    };

    this.channels().forEach(channel => {
      let centers = this.centersByChannel[channel];

      if (areasOfDefinition[1].length === 0 || centers.some(center => areasOfDefinition[1].includes(center))) {
        areasOfDefinition[1] = [...new Set([...areasOfDefinition[1], ...centers])];
      } else if (centers.some(center => areasOfDefinition[1].includes(center)) && centers.some(center => areasOfDefinition[2].includes(center))) {
        areasOfDefinition[1] = [...new Set([...areasOfDefinition[1], ...areasOfDefinition[2], ...centers])];
        areasOfDefinition[2] = [];
      } else if (areasOfDefinition[2].length === 0 || centers.some(center => areasOfDefinition[2].includes(center))) {
        areasOfDefinition[2] = [...new Set([...areasOfDefinition[2], ...centers])];
      } else if (centers.some(center => areasOfDefinition[1].includes(center)) && centers.some(center => areasOfDefinition[3].includes(center))) {
        areasOfDefinition[1] = [...new Set([...areasOfDefinition[1], ...areasOfDefinition[3], ...centers])];
        areasOfDefinition[3] = [];
      } else if (centers.some(center => areasOfDefinition[2].includes(center)) && centers.some(center => areasOfDefinition[3].includes(center))) {
        areasOfDefinition[2] = [...new Set([...areasOfDefinition[2], ...areasOfDefinition[3], ...centers])];
        areasOfDefinition[3] = [];
      } else if (areasOfDefinition[3].length === 0 || centers.some(center => areasOfDefinition[3].includes(center))) {
        areasOfDefinition[3] = [...new Set([...areasOfDefinition[3], ...centers])];
      } else if (centers.some(center => areasOfDefinition[1].includes(center)) && centers.some(center => areasOfDefinition[4].includes(center))) {
        areasOfDefinition[1] = [...new Set([...areasOfDefinition[1], ...areasOfDefinition[4], ...centers])];
        areasOfDefinition[4] = [];
      } else if (centers.some(center => areasOfDefinition[2].includes(center)) && centers.some(center => areasOfDefinition[4].includes(center))) {
        areasOfDefinition[2] = [...new Set([...areasOfDefinition[2], ...areasOfDefinition[4], ...centers])];
        areasOfDefinition[4] = [];
      } else if (centers.some(center => areasOfDefinition[3].includes(center)) && centers.some(center => areasOfDefinition[4].includes(center))) {
        areasOfDefinition[3] = [...new Set([...areasOfDefinition[3], ...areasOfDefinition[4], ...centers])];
        areasOfDefinition[4] = [];
      } else if (areasOfDefinition[4].length === 0 || centers.some(center => areasOfDefinition[4].includes(center))) {
        areasOfDefinition[4] = [...new Set([...areasOfDefinition[4], ...centers])];
      }
    });

    if (areasOfDefinition[4].length !== 0) {
      return 'Quad Split';
    } else if (areasOfDefinition[3].length !== 0) {
      return 'Triple Split';
    } else if (areasOfDefinition[2].length !== 0) {
      return 'Split';
    } else if (areasOfDefinition[1].length !== 0) {
      return 'Single';
    } else {
      return 'None';
    }
  }

  incarnationCross() {
    if (this.personality_activations.sun_line < 5 && this.design_activations.sun_line >= 3) {
      return 'Right Angle Cross of ' + RIGHT_ANGLE_CROSSES_BY_SUN_GATE[this.personality_activations.sun_gate];
    } else if (this.personality_activations.sun_line >= 5 && this.design_activations.sun_line < 3) {
      return 'Juxtaposition Cross of ' + JUXTAPOSITION_CROSSES_BY_SUN_GATE[this.personality_activations.sun_gate];
    } else {
      return 'Unknown';
    }
  }

  motorToThroat() {
    return this.gToThroat() || this.ajnaToThroat() || this.throatToG();
  }

  gToThroat() {
    return this.isActivated(this.personality_activations.g_throat_gate) || this.isActivated(this.design_activations.g_throat_gate);
  }

  ajnaToThroat() {
    return this.isActivated(this.personality_activations.ajna_throat_gate) || this.isActivated(this.design_activations.ajna_throat_gate);
  }

  throatToG() {
    return this.isActivated(this.personality_activations.throat_g_gate) || this.isActivated(this.design_activations.throat_g_gate);
  }

  solarPlexusDefined() {
    return this.isActivated(this.personality_activations.solar_plexus_gate) || this.isActivated(this.design_activations.solar_plexus_gate);
  }

  sacralDefined() {
    return this.isActivated(this.personality_activations.sacral_gate) || this.isActivated(this.design_activations.sacral_gate);
  }

  spleenDefined() {
    return this.isActivated(this.personality_activations.spleen_gate) || this.isActivated(this.design_activations.spleen_gate);
  }

  egoToThroat() {
    return this.isActivated(this.personality_activations.ego_throat_gate) || this.isActivated(this.design_activations.ego_throat_gate);
  }

  gToEgo() {
    return this.isActivated(this.personality_activations.g_ego_gate) || this.isActivated(this.design_activations.g_ego_gate);
  }

  headToAjna() {
    return this.isActivated(this.personality_activations.head_ajna_gate) || this.isActivated(this.design_activations.head_ajna_gate);
  }

  channels() {
    return [...new Set([...Object.keys(this.centersByChannel)])];
  }

  noCentersDefined() {
    return !this.solarPlexusDefined() && !this.sacralDefined() && !this.spleenDefined() && !this.egoToThroat() && !this.gToEgo() && !this.gToThroat() && !this.ajnaToThroat() && !this.throatToG() && !this.headToAjna();
  }

  isActivated(gate) {
    return gate > 0;
  }

  get centersByChannel() {
    return {
      '7-31': ['Root'],
      '19-49': ['Sacral'],
      '53-42': ['Solar Plexus'],
      '58-18': ['Root'],
      '22-12': ['Solar Plexus', 'Splenic'],
      '35-36': ['Root'],
      '64-47': ['Splenic'],
      '17-62': ['Heart', 'Throat'],
      '21-45': ['Ajna', 'Throat'],
      '56-52': ['Sacral', 'Splenic'],
      '39-55': ['Throat'],
      '38-54': ['Throat'],
      '61-24': ['Sacral', 'Throat'],
      '59-6': ['Sacral', 'Splenic'],
      '60-3': ['Sacral'],
      '34-20': ['Root'],
      '27-50': ['Sacral'],
      '33-13': ['Root'],
      '44-26': ['Splenic', 'Throat'],
      '28-38': ['Throat'],
      '41-30': ['G', 'Throat'],
      '57-10': ['Sacral'],
      '46-25': ['Ajna'],
      '23-43': ['Solar Plexus'],
      '8-14': ['Root'],
      '29-46': ['Sacral'],
      '2-14': ['Root'],
      '4-63': ['Splenic', 'Throat'],
      '51-25': ['Ajna'],
      '16-48': ['Splenic'],
      '31-57': ['Sacral', 'Heart'],
      '32-54': ['Throat'],
      '3-60': ['Sacral'],
      '5-15': ['Root'],
      '62-56': ['Sacral', 'Splenic'],
      '37-40': ['Throat'],
      '6-36': ['Root'],
      '35-36': ['Root'],
      '11-56': ['Splenic'],
      '24-44': ['Ajna'],
      '63-4': ['Splenic', 'Throat'],
      '26-44': ['Ajna'],
      '18-58': ['Root'],
      '9-52': ['Sacral', 'Splenic'],
      '40-37': ['Throat'],
      '15-5': ['Root'],
      '20-34': ['Root'],
      '42-53': ['Solar Plexus'],
      '45-21': ['Ajna', 'Throat'],
      '43-23': ['Solar Plexus'],
      '25-46': ['Ajna'],
      '49-19': ['Sacral'],
      '64-47': ['Splenic'],
      '47-64': ['Splenic'],
      '50-27': ['Sacral'],
      '54-38': ['Throat'],
      '58-18': ['Root'],
      '17-62': ['Heart', 'Throat'],
      '24-44': ['Ajna'],
      '26-44': ['Ajna'],
      '38-54': ['Throat'],
      '10-57': ['Sacral'],
      '18-58': ['Root'],
      '20-34': ['Root'],
      '25-46': ['Ajna'],
      '27-50': ['Sacral'],
      '28-38': ['Throat'],
      '30-41': ['G', 'Throat'],
      '32-54': ['Throat'],
      '36-6': ['Root'],
      '40-37': ['Throat'],
      '45-21': ['Ajna', 'Throat'],
      '50-27': ['Sacral'],
      '52-9': ['Sacral', 'Splenic'],
      '54-32': ['Throat'],
      '56-11': ['Splenic'],
      '63-4': ['Splenic', 'Throat'],
      '12-22': ['Solar Plexus', 'Splenic'],
      '13-33': ['Root'],
      '14-2': ['Root'],
      '15-5': ['Root'],
      '36-35': ['Root'],
      '38-28': ['Throat'],
      '41-30': ['G', 'Throat'],
      '44-26': ['Splenic', 'Throat'],
      '46-29': ['Sacral'],
      '47-64': ['Splenic'],
      '48-16': ['Splenic'],
      '54-32': ['Throat'],
      '60-3': ['Sacral'],
      '61-24': ['Sacral', 'Throat'],
      '64-47': ['Splenic']
    };
  }

  _getActivationNumber(gate, activations) {
    const value = parseInt(gate.split('.')[1]);
    return activations[value - 1] || 0;
  }
}

module.exports = HumanDesignCalculator;

