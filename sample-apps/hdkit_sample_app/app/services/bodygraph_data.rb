class BodygraphData
  def initialize(personality_activations, design_activations)
    @personality_activations = personality_activations
    @design_activations = design_activations
  end

  def all_activated_gates
    all_activated_gates = {}
    gate_attributes = %i[sun_gate earth_gate north_node_gate south_node_gate moon_gate mercury_gate venus_gate mars_gate jupiter_gate saturn_gate uranus_gate neptune_gate pluto_gate]
    gate_attributes.each do |gate_attribute|
      all_activated_gates[@personality_activations[gate_attribute]] = true
      all_activated_gates[@design_activations[gate_attribute]] = true
    end
    all_activated_gates
  end

  def aura_type
    if sacral_defined
      motor_to_throat ? 'Manifesting Generator' : 'Generator'
    elsif motor_to_throat
      'Manifestor'
    elsif no_centers_defined
      'Reflector'
    else
      'Projector'
    end
  end

  def inner_authority
    if solar_plexus_defined
      'Solar Plexus'
    elsif sacral_defined
      'Sacral'
    elsif spleen_defined
      'Spleen'
    elsif ego_to_throat || g_to_ego
      'Ego'
    elsif g_to_throat
      'Self Projected'
    elsif head_to_ajna || ajna_to_throat
      'Outer Authority'
    else
      'Lunar'
    end
  end

  def definition
    areas_of_definition = {
      1 => [],
      2 => [],
      3 => [],
      4 => []
    }

    channels.each do |channel|
      centers = centers_by_channel[channel]

      # If no definition yet, or channel defines center already in 1st area of definition
      if areas_of_definition[1].empty? || centers.any? { |center| areas_of_definition[1].include?(center) }
        areas_of_definition[1] |= centers
        if centers.any? { |center| areas_of_definition[1].include?(center) } && centers.any? { |center| areas_of_definition[2].include?(center) }
          areas_of_definition[1] |= areas_of_definition[2]
          areas_of_definition[2] = []
          areas_of_definition[1] |= centers
        end
      # If channel defines centers in both 1st and 2nd area of definition, combine them
      elsif centers.any? { |center| areas_of_definition[1].include?(center) } && centers.any? { |center| areas_of_definition[2].include?(center) }
        areas_of_definition[1] |= areas_of_definition[2]
        areas_of_definition[2] = []
        areas_of_definition[1] |= centers
      # If no 2nd area of definition yet, or channel defines center already in 2nd area
      elsif areas_of_definition[2].empty? || centers.any? { |center| areas_of_definition[2].include?(center) }
        areas_of_definition[2] |= centers
      # If channel defines centers in both 1st and 3rd area of definition, combine them
      elsif centers.any? { |center| areas_of_definition[1].include?(center) } && centers.any? { |center| areas_of_definition[3].include?(center) }
        areas_of_definition[1] |= areas_of_definition[3]
        areas_of_definition[3] = []
        areas_of_definition[1] |= centers
      # If channel defines centers in both 2nd and 3rd area of definition, combine them
      elsif centers.any? { |center| areas_of_definition[2].include?(center) } && centers.any? { |center| areas_of_definition[3].include?(center) }
        areas_of_definition[2] |= areas_of_definition[3]
        areas_of_definition[3] = []
        areas_of_definition[2] |= centers
      # If no 3rd area of definition yet, or channel defines center already in 3rd area
      elsif areas_of_definition[3].empty? || centers.any? { |center| areas_of_definition[3].include?(center) }
        areas_of_definition[3] |= centers
      # If channel defines centers in both 1st and 4th area of definition, combine them
      elsif centers.any? { |center| areas_of_definition[1].include?(center) } && centers.any? { |center| areas_of_definition[4].include?(center) }
        areas_of_definition[1] |= areas_of_definition[4]
        areas_of_definition[4] = []
        areas_of_definition[1] |= centers
      # If channel defines centers in both 2nd and 4th area of definition, combine them
      elsif centers.any? { |center| areas_of_definition[2].include?(center) } && centers.any? { |center| areas_of_definition[4].include?(center) }
        areas_of_definition[2] |= areas_of_definition[4]
        areas_of_definition[4] = []
        areas_of_definition[2] |= centers
      # If channel defines centers in both 3rd and 4th area of definition, combine them
      elsif centers.any? { |center| areas_of_definition[3].include?(center) } && centers.any? { |center| areas_of_definition[4].include?(center) }
        areas_of_definition[3] |= areas_of_definition[4]
        areas_of_definition[4] = []
        areas_of_definition[3] |= centers
      # If no 4th area of definition yet, or channel defines center already in 4th area
      elsif areas_of_definition[4].empty? || centers.any? { |center| areas_of_definition[4].include?(center) }
        areas_of_definition[4] |= centers
      end
    end

    if !areas_of_definition[4].empty?
      'Quad Split'
    elsif !areas_of_definition[3].empty?
      'Triple Split'
    elsif !areas_of_definition[2].empty?
      'Split'
    elsif !areas_of_definition[1].empty?
      'Single'
    else
      'None'
    end
  end

  def incarnation_cross
    if @personality_activations[:sun_line] < 5 && @design_activations[:sun_line] >= 3
      'Right Angle Cross of ' + RIGHT_ANGLE_CROSSES_BY_SUN_GATE[@personality_activations[:sun_gate]]
    elsif @personality_activations[:sun_line] >= 5
      'Left Angle Cross of ' + LEFT_ANGLE_CROSSES_BY_SUN_GATE[@personality_activations[:sun_gate]]
    else
      'Juxtaposition Cross of ' + JUXTAPOSITION_CROSSES_BY_SUN_GATE[@personality_activations[:sun_gate]]
    end
  end

  def determination
    case ((@design_activations[:sun_line] % 1) / (1.0 / 6)).to_i
    when 0
      'Appetite'
    when 1
      'Taste'
    when 2
      'Thirst'
    when 3
      'Touch'
    when 4
      'Sound'
    when 5
      'Light'
    end
  end

  def environment
    case ((@design_activations[:north_node_line] % 1) / (1.0 / 6)).to_i
    when 0
      'Caves'
    when 1
      'Markets'
    when 2
      'Kitchens'
    when 3
      'Mountains'
    when 4
      'Valleys'
    when 5
      'Shores'
    end
  end

  def view
    case ((@personality_activations[:north_node_line] % 1) / (1.0 / 6)).to_i
    when 0
      'Survival'
    when 1
      'Possibility'
    when 2
      'Power'
    when 3
      'Wanting'
    when 4
      'Probability'
    when 5
      'Personal'
    end
  end

  def motivation
    case ((@personality_activations[:sun_line] % 1) / (1.0 / 6)).to_i
    when 0
      'Fear'
    when 1
      'Hope'
    when 2
      'Desire'
    when 3
      'Need'
    when 4
      'Guilt'
    when 5
      'Innocence'
    end
  end

  def cognition
    color = ((@design_activations[:sun_line] % 1) / (1.0 / 6))
    case ((color % 1) / (1.0 / 6)).to_i
    when 0
      'Smell'
    when 1
      'Taste'
    when 2
      'Outer Vision'
    when 3
      'Inner Vision'
    when 4
      'Feeling'
    when 5
      'Touch'
    end
  end

  def sense
    color = ((@personality_activations[:sun_line] % 1) / (1.0 / 6))
    case ((color % 1) / (1.0 / 6)).to_i
    when 0
      'Security'
    when 1
      'Uncertainty'
    when 2
      'Action'
    when 3
      'Meditation'
    when 4
      'Judgment'
    when 5
      'Acceptance'
    end
  end

  def design_nodes_tone
    color = ((@design_activations[:north_node_line] % 1) / (1.0 / 6))
    ((color % 1) / (1.0 / 6)).to_i + 1 # Returns a value from 1-6
  end

  def personality_nodes_tone
    color = ((@personality_activations[:north_node_line] % 1) / (1.0 / 6))
    ((color % 1) / (1.0 / 6)).to_i + 1 # Returns a value from 1-6
  end

  def variable
    variable = 'P'
    variable += (@personality_activations[:sun_line] % (1.0 / 6) * 6) < 0.5 ? 'L' : 'R'
    variable += (@personality_activations[:north_node_line] % (1.0 / 6) * 6) < 0.5 ? 'L' : 'R'
    variable += ' D'
    variable += (@design_activations[:sun_line] % (1.0 / 6) * 6) < 0.5 ? 'L' : 'R'
    variable += (@design_activations[:north_node_line] % (1.0 / 6) * 6) < 0.5 ? 'L' : 'R'
  end

  def sacral_defined
    sacral_channels.any? { |channel| channel_activated?(channel) }
  end

  def throat_defined
    throat_channels.any? { |channel| channel_activated?(channel) }
  end

  def ego_defined
    ego_channels.any? { |channel| channel_activated?(channel) }
  end

  def root_defined
    root_channels.any? { |channel| channel_activated?(channel) }
  end

  def spleen_defined
    spleen_channels.any? { |channel| channel_activated?(channel) }
  end

  def solar_plexus_defined
    solar_plexus_channels.any? { |channel| channel_activated?(channel) }
  end

  def g_center_defined
    g_center_channels.any? { |channel| channel_activated?(channel) }
  end

  def head_defined
    head_channels.any? { |channel| channel_activated?(channel) }
  end

  def ajna_defined
    ajna_channels.any? { |channel| channel_activated?(channel) }
  end

  private

  RIGHT_ANGLE_CROSSES_BY_SUN_GATE = {
    1 => 'the Sphinx 4',
    2 => 'the Sphinx 2',
    3 => 'Laws',
    4 => 'Explanation 3',
    5 => 'Consciousness 4',
    6 => 'Eden 3',
    7 => 'the Sphinx 3',
    8 => 'Contagion 2',
    9 => 'Planning 4',
    10 => 'the Vessel of Love 4',
    11 => 'Eden 4',
    12 => 'Eden 2',
    13 => 'the Sphinx',
    14 => 'Contagion 4',
    15 => 'the Vessel of Love 2',
    16 => 'Planning 2',
    17 => 'Service',
    18 => 'Service 3',
    19 => 'the Four Ways 4',
    20 => 'the Sleeping Phoenix 2',
    21 => 'Tension',
    22 => 'Rulership',
    23 => 'Explanation 2',
    24 => 'the Four Ways',
    25 => 'the Vessel of Love',
    26 => 'Rulership 4',
    27 => 'the Unexpected',
    28 => 'the Unexpected 3',
    29 => 'Contagion 3',
    30 => 'Contagion',
    31 => 'the Unexpected 2',
    32 => 'Maya 3',
    33 => 'the Four Ways 2',
    34 => 'the Sleeping Phoenix 4',
    35 => 'Consciousness 2',
    36 => 'Eden',
    37 => 'Planning',
    38 => 'Tension 4',
    39 => 'Tension 2',
    40 => 'Planning 3',
    41 => 'the Unexpected 4',
    42 => 'Maya',
    43 => 'Explanation 4',
    44 => 'the Four Ways 3',
    45 => 'Rulership 2',
    46 => 'the Vessel of Love 3',
    47 => 'Rulership 3',
    48 => 'Tension 3',
    49 => 'Explanation',
    50 => 'Laws 3',
    51 => 'Penetration 2',
    52 => 'Service 2',
    53 => 'Penetration 2',
    54 => 'Penetration 4',
    55 => 'the Sleeping Phoenix',
    56 => 'Laws 2',
    57 => 'Penetration 3',
    58 => 'Service 4',
    59 => 'the Sleeping Phoenix 3',
    60 => 'Laws 4',
    61 => 'Maya 4',
    62 => 'Maya 2',
    63 => 'Consciousness',
    64 => 'Consciousness 3'
  }.freeze

  JUXTAPOSITION_CROSSES_BY_SUN_GATE = {
    1 => 'Self-Expression',
    2 => 'the Driver',
    3 => 'Mutation',
    4 => 'Formulization',
    5 => 'Habits',
    6 => 'Conflict',
    7 => 'Interaction',
    8 => 'Contribution',
    9 => 'Focus',
    10 => 'Behavior',
    11 => 'Ideas',
    12 => 'Articulation',
    13 => 'Listening',
    14 => 'Empowering',
    15 => 'Extremes',
    16 => 'Experimentation',
    17 => 'Opinions',
    18 => 'Correction',
    19 => 'Need',
    20 => 'the Now',
    21 => 'Control',
    22 => 'Grace',
    23 => 'Assimilation',
    24 => 'Rationalization',
    25 => 'Innocence',
    26 => 'the Trickster',
    27 => 'Caring',
    28 => 'Risks',
    29 => 'Commitment',
    30 => 'Fates',
    31 => 'Influence',
    32 => 'Conservation',
    33 => 'Retreat',
    34 => 'Power',
    35 => 'Experience',
    36 => 'Crisis',
    37 => 'Bargains', # Friendship
    38 => 'Opposition', # the Fighter
    39 => 'Provocation', # the Provocateur
    40 => 'Denial', # Aloneness
    41 => 'Fantasy', # Contraction
    42 => 'Completion', # Growth
    43 => 'Insight',
    44 => 'Alertness',
    45 => 'Posession', # the Gatherer
    46 => 'Serendipity', # the Determination of the Self
    47 => 'Oppression', # Realizing
    48 => 'Depth',
    49 => 'Principles',
    50 => 'Values',
    51 => 'Shock',
    52 => 'Stillness', # Inaction
    53 => 'Beginnings',
    54 => 'Ambition',
    55 => 'Moods', # Spirit
    56 => 'Stimulation',
    57 => 'Intuition', # Intuitive Insight
    58 => 'Vitality', # Aliveness
    59 => 'Strategy', # Sexuality
    60 => 'Limitation', # Acceptance
    61 => 'Thinking', # Mystery
    62 => 'Detail',
    63 => 'Doubt',
    64 => 'Confusion'
  }.freeze

  LEFT_ANGLE_CROSSES_BY_SUN_GATE = {
    1 => 'Defiance 2',
    2 => 'Defiance',
    3 => 'Wishes',
    4 => 'Revolution 2',
    5 => 'Separation 2',
    6 => 'the Plane 2',
    7 => 'Masks 2',
    8 => 'Uncertainty',
    9 => 'Identification 2',
    10 => 'Prevention 2',
    11 => 'Education 2',
    12 => 'Education',
    13 => 'Masks',
    14 => 'Uncertainty 2',
    15 => 'Prevention',
    16 => 'Identification',
    17 => 'Upheaval',
    18 => 'Upheaval 2',
    19 => 'Refinement 2',
    20 => 'Duality',
    21 => 'Endeavour',
    22 => 'Informing',
    23 => 'Dedication',
    24 => 'Incarnation',
    25 => 'Healing',
    26 => 'Confrontation 2',
    27 => 'Alignment',
    28 => 'Alignment 2',
    29 => 'Industry 2',
    30 => 'Industry',
    31 => 'the Alpha',
    32 => 'Limitation 2',
    33 => 'Refinement',
    34 => 'Duality 2',
    35 => 'Separation',
    36 => 'the Plane',
    37 => 'Migration',
    38 => 'Individualism 2',
    39 => 'Individualism',
    40 => 'Migration 2',
    41 => 'the Alpha 2',
    42 => 'Limitation',
    43 => 'Dedication 2',
    44 => 'Incarnation 2',
    45 => 'Confrontation',
    46 => 'Healing 2',
    47 => 'Informing 2',
    48 => 'Endeavour 2',
    49 => 'Revolution',
    50 => 'Wishes 2',
    51 => 'the Clarion',
    52 => 'Demands',
    53 => 'Cycles',
    54 => 'Cycles 2',
    55 => 'Spirit',
    56 => 'Distraction',
    57 => 'the Clarion 2',
    58 => 'Demands 2',
    59 => 'Spirit 2',
    60 => 'Distraction 2',
    61 => 'Obscuration 2',
    62 => 'Obscuration',
    63 => 'Dominion',
    64 => 'Dominion 2'
  }.freeze

  def centers_by_channel
    {
      [61, 24] => ['Head', 'Ajna'],
      [43, 23] => ['Ajna', 'Throat'],
      [20, 10] => ['Throat', 'G Center'],
      [20, 57] => ['Throat', 'Spleen'],
      [20, 34] => ['Throat', 'Sacral'],
      [12, 22] => ['Throat', 'Solar Plexus'],
      [8, 1] => ['Throat', 'G Center'],
      [10, 57] => ['G Center', 'Spleen'],
      [10, 34] => ['G Center', 'Sacral'],
      [25, 51] => ['G Center', 'Ego'],
      [2, 14] => ['G Center', 'Sacral'],
      [57, 34] => ['Spleen', 'Sacral'],
      [28, 38] => ['Spleen', 'Root'],
      [55, 39] => ['Solar Plexus', 'Root'],
      [3, 60] => ['Sacral', 'Root'],
      [45, 21] => ['Throat', 'Ego'],
      [26, 44] => ['Ego', 'Spleen'],
      [40, 37] => ['Ego', 'Solar Plexus'],
      [50, 27] => ['Spleen', 'Sacral'],
      [6, 59] => ['Solar Plexus', 'Sacral'],
      [32, 54] => ['Spleen', 'Root'],
      [49, 19] => ['Solar Plexus', 'Root'],
      [64, 47] => ['Head', 'Ajna'],
      [63, 4] => ['Head', 'Ajna'],
      [17, 62] => ['Ajna', 'Throat'],
      [11, 56] => ['Ajna', 'Throat'],
      [16, 48] => ['Throat', 'Spleen'],
      [35, 36] => ['Throat', 'Solar Plexus'],
      [31, 7] => ['Throat', 'G Center'],
      [33, 13] => ['Throat', 'G Center'],
      [15, 5] => ['G Center', 'Sacral'],
      [46, 29] => ['G Center', 'Sacral'],
      [18, 58] => ['Spleen', 'Root'],
      [42, 53] => ['Sacral', 'Root'],
      [9, 52] => ['Sacral', 'Root'],
      [30, 41] => ['Solar Plexus', 'Root']
    }
  end

  def gate_activated?(gate)
    all_activated_gates[gate]
  end

  def channel_activated?(channel)
    gate_activated?(channel[0]) && gate_activated?(channel[1])
  end

  def channels
    [
      [61, 24], [43, 23], [20, 10], [20, 57], [20, 34], [12, 22], [8, 1],
      [10, 57], [10, 34], [25, 51], [2, 14], [57, 34], [28, 38], [55, 39], [3, 60],
      [45, 21], [26, 44], [40, 37], [50, 27], [6, 59], [32, 54], [49, 19],
      [64, 47], [63, 4], [17, 62], [11, 56], [16, 48], [35, 36], [31, 7], [33, 13],
      [15, 5], [46, 29], [18, 58], [42, 53], [9, 52], [30, 41]
    ].select { |channel| gate_activated?(channel[0]) && gate_activated?(channel[1]) }
  end

  def no_centers_defined
    channels.empty?
  end

  def sacral_channels
    [
      [2, 14], [5, 15], [29, 46], [6, 59], [9, 52], [3, 60], [42, 53], [34, 10], [34, 57], [34, 20], [50, 27]
    ]
  end

  def throat_channels
    [
      [16, 48], [17, 62], [43, 23], [11, 56], [35, 36], [12, 22], [45, 21],
      [13, 33], [1, 8], [7, 31], [57, 20], [10, 20], [34, 20]
    ]
  end

  def ego_channels
    [
      [25, 51], [26, 44], [21, 45], [40, 37]
    ]
  end

  def root_channels
    [
      [18, 58], [28, 38], [54, 32],
      [53, 42], [60, 3], [9, 52],
      [19, 49], [39, 55], [41, 30]
    ]
  end

  def spleen_channels
    [
      [18, 58], [28, 38], [54, 32],
      [50, 27], [44, 26], [57, 10],
      [57, 34], [57, 20], [48, 16]
    ]
  end

  def solar_plexus_channels
    [
      [6, 59], [37, 40], [36, 35],
      [12, 22], [19, 49], [39, 55],
      [41, 30]
    ]
  end

  def g_center_channels
    [
      [5, 15], [2, 14], [29, 46],
      [25, 51], [13, 33], [7, 31],
      [1, 8], [10, 57], [10, 34], [10, 20]
    ]
  end

  def head_channels
    [
      [64, 47], [61, 24], [63, 4]
    ]
  end

  def ajna_channels
    [
      [64, 47], [61, 24], [63, 4], [17, 62], [43, 23], [11, 56]
    ]
  end

  def sacral_to_throat
    gate_activated?(34) && gate_activated?(20)
  end

  def ego_to_throat
    gate_activated?(45) && gate_activated?(21)
  end

  def solar_plexus_to_throat
    (gate_activated?(12) && gate_activated?(22)) ||
      (gate_activated?(35) && gate_activated?(36))
  end

  def g_to_throat
    [
      [13, 33], [1, 8], [7, 31], [10, 20]
    ].any? { |gate_pair| gate_pair.all? { |gate| gate_activated?(gate) } }
  end

  def g_to_ego
    gate_activated?(51) && gate_activated?(25)
  end

  def g_to_spleen
    gate_activated?(10) && gate_activated?(57)
  end

  def g_to_sacral
    [
      [15, 5], [2, 14], [46, 29]
    ].any? { |gate_pair| gate_pair.all? { |gate| gate_activated?(gate) } }
  end

  def spleen_to_throat
    (gate_activated?(16) && gate_activated?(48)) ||
      (gate_activated?(57) && gate_activated?(20))
  end

  def spleen_to_root
    [
      [54, 32], [28, 38], [18, 58]
    ].any? { |gate_pair| gate_pair.all? { |gate| gate_activated?(gate) } }
  end

  def spleen_to_ego
    gate_activated?(44) && gate_activated?(26)
  end

  def head_to_ajna
    [
      [64, 47], [61, 24], [63, 4]
    ].any? { |gate_pair| gate_pair.all? { |gate| gate_activated?(gate) } }
  end

  def ajna_to_throat
    [
      [17, 62], [43, 23], [11, 56]
    ].any? { |gate_pair| gate_pair.all? { |gate| gate_activated?(gate) } }
  end

  def motor_to_throat
    return true if throat_defined &&
                   (sacral_to_throat ||
                    ego_to_throat ||
                    solar_plexus_to_throat ||
                    (g_to_throat && g_to_ego) ||
                    (g_to_throat && g_to_spleen && spleen_to_root) ||
                    (g_to_throat && g_to_sacral) ||
                    (spleen_to_throat && spleen_to_root) ||
                    (spleen_to_throat && spleen_to_ego))

    false
  end
end