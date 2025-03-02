require 'rest-client'
require 'swe4r'

module BodygraphsHelper

  def build_bodygraph(params, id = nil)
    bodygraph = id.present? ? Bodygraph.find_by(id:) : Bodygraph.new
    bodygraph.name = params[:name]
    bodygraph.birth_date = params[:birth_date]
    bodygraph.birth_time = params[:birth_time]
    bodygraph.birth_country = params[:birth_country]
    bodygraph.birth_city = params[:birth_city]

    # Find birth date in UTC
    Geocoder.configure(api_key: ENV.fetch('GOOGLE_API_KEY', nil))
    location_info = Geocoder.search("#{bodygraph.birth_city}, #{bodygraph.birth_country}").first

    if location_info.nil?
      # Either the city and country can't be found (unlikely) or GOOGLE_API_KEY is not set properly
      # Rails.logger.error "Geocoder failed to find a location for #{bodygraph.birth_city}, #{bodygraph.birth_country}"

      # For testing purposes, if GOOGLE_API_KEY is not set, use Jonah's latitude and longitude for Malden, MA, USA
      bodygraph.latitude = 42.4264
      bodygraph.longitude = -71.0650
    else
      bodygraph.latitude = location_info.latitude
      bodygraph.longitude = location_info.longitude
    end

    response = RestClient.get 'https://maps.googleapis.com/maps/api/timezone/json', params: {
      key: ENV.fetch('GOOGLE_API_KEY', nil),
      location: "#{bodygraph.latitude},#{bodygraph.longitude}",
      timestamp: Time.now.to_i
    }
    timezone_data = JSON.parse(response.body)

    if timezone_data['timeZoneId'].present?
      bodygraph.timezone = timezone_data['timeZoneId']
    else
      # If timeZoneId is nil, likely because GOOGLE_API_KEY is not set, so use Jonah's birth timezone for Malden, MA, USA
      bodygraph.timezone = 'America/New_York'
    end

    local_time = ActiveSupport::TimeZone[bodygraph.timezone].parse(params[:birth_date_local])
    bodygraph.birth_date_utc = local_time.utc

    # Find design date
    bodygraph.design_date_utc = find_design_date(bodygraph.birth_date_utc)
    raise StandardError, "Design date is nil. Unable to find a design date." if bodygraph.design_date_utc.nil?

    celestial_bodies = [
      Swe4r::SE_SUN,
      Swe4r::SE_MOON,
      Swe4r::SE_TRUE_NODE, # North Node
      Swe4r::SE_MERCURY,
      Swe4r::SE_VENUS,
      Swe4r::SE_MARS,
      Swe4r::SE_JUPITER,
      Swe4r::SE_SATURN,
      Swe4r::SE_URANUS,
      Swe4r::SE_NEPTUNE,
      Swe4r::SE_PLUTO
    ]

    celestial_positions = {}
    birth_date = bodygraph.birth_date_utc
    birth_hour = birth_date.hour.to_f + (birth_date.min.to_f / 60) + (birth_date.sec.to_f / 3600)
    jd_birth_date = Swe4r.swe_julday(birth_date.year, birth_date.month, birth_date.day, birth_hour)
    celestial_bodies.each do |body|
      celestial_positions[body] = Swe4r.swe_calc_ut(jd_birth_date, body, Swe4r::SEFLG_MOSEPH)
    end

    design_celestial_positions = {}
    design_date = bodygraph.design_date_utc
    design_hour = design_date.hour.to_f + (design_date.min.to_f / 60) + (design_date.sec.to_f / 3600)
    jd_design_date = Swe4r.swe_julday(design_date.year, design_date.month, design_date.day, design_hour)
    celestial_bodies.each do |body|
      design_celestial_positions[body] = Swe4r.swe_calc_ut(jd_design_date, body, Swe4r::SEFLG_MOSEPH)
    end

    hdkit = Hdkit.new
    personality_activations = hdkit.generate_activations(celestial_positions)
    design_activations = hdkit.generate_activations(design_celestial_positions)

    # Get the rest of the data using the BodygraphData service
    bodygraph_data = BodygraphData.new(personality_activations, design_activations)
    bodygraph.aura_type = bodygraph_data.aura_type
    bodygraph.inner_authority = bodygraph_data.inner_authority
    bodygraph.definition = bodygraph_data.definition
    bodygraph.profile = "#{personality_activations[:sun_line].to_i}/#{design_activations[:sun_line].to_i}"
    bodygraph.incarnation_cross = bodygraph_data.incarnation_cross
    bodygraph.cognition = bodygraph_data.cognition
    bodygraph.sense = bodygraph_data.sense
    bodygraph.variable = bodygraph_data.variable
    bodygraph.determination = bodygraph_data.determination
    bodygraph.environment = bodygraph_data.environment
    bodygraph.view = bodygraph_data.view
    bodygraph.motivation = bodygraph_data.motivation
    bodygraph.personality_activations = personality_activations.to_json
    bodygraph.design_activations = design_activations.to_json
    bodygraph.head_defined = bodygraph_data.head_defined
    bodygraph.ajna_defined = bodygraph_data.ajna_defined
    bodygraph.throat_defined = bodygraph_data.throat_defined
    bodygraph.spleen_defined = bodygraph_data.spleen_defined
    bodygraph.solar_plexus_defined = bodygraph_data.solar_plexus_defined
    bodygraph.g_center_defined = bodygraph_data.g_center_defined
    bodygraph.sacral_defined = bodygraph_data.sacral_defined
    bodygraph.root_defined = bodygraph_data.root_defined
    bodygraph.ego_defined = bodygraph_data.ego_defined
    bodygraph.personality_nodes_tone = bodygraph_data.personality_nodes_tone
    bodygraph.design_nodes_tone = bodygraph_data.design_nodes_tone
    bodygraph.all_activated_gates = bodygraph_data.all_activated_gates.keys

    bodygraph
  end

  def opposite_gate(gate)
    index = GATES.index(gate.to_i)
    OPPOSITE_GATES[index]
  end

  def harmonic_gate(gate)
    index = GATES.index(gate.to_i)
    HARMONIC_GATES[index]
  end

  def next_gate(gate)
    index = GATES.index(gate.to_i) + 1
    index = 0 if index == 64
    GATES[index]
  end

  def previous_gate(gate)
    index = GATES.index(gate.to_i) - 1
    index = 63 if index == -1
    GATES[index]
  end

  def next_gate_number(gate)
    gate = gate.to_i + 1
    gate = 1 if gate.to_i == 65
    gate
  end

  def previous_gate_number(gate)
    gate = gate.to_i - 1
    gate = 64 if gate.to_i == 0
    gate
  end

  def mirror_gate(gate)
    index = GATES.index(gate.to_i)
    MIRROR_GATES[index]
  end

  private

  MIRROR_GATES = [58, 54, 7, 32, 18, 28, 44, 64, 57, 48, 10, 11, 'None', 'None', 47, 24, 59, 3, 1, 8, 23, 12, 35, 16, 'None', 20, 46, 63, 38, 64, 56, 62, 33, 31, 13, 9, 5, 27, 'None', 53, 42, 50, 15, 30, 36, 22, 49, 6, 55, 37, 2, 14, 43, 'None', 4, 17, 'None', 29, 25, 41, 39, 19, 60, 61].freeze

  HARMONIC_GATES = [
    30, 49, 33, 19, 41, 39, 40, 4, 12, 35, 51, 62, 45, 25, 53, 60, 50, 61, 14, 43, 1, [34, 57, 10], 48, 36, 21, 22, 5, 9, 55, 42, 17, 11, 7, 13, 31, 63, 46, 6, 37, 47, 64, 59, 29, 58, 16, [34, 10, 20], 54, 27, 38, 26, 8, 23, 2, [57, 10, 20], 52, 15, 44, 56, [34, 57, 20], 18, 28, 32, 24, 3
  ].freeze

  GATES = [41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8,
           20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6,
           46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60].freeze

  OPPOSITE_GATES = [31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34,
                    9, 5, 26, 11, 10, 58, 38, 54, 61, 60, 41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25,
                    17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56].freeze

  CENTERS_BY_GATE = {
    "1" => 'g center',
    "2" => 'g center',
    "3" => 'sacral',
    "4" => 'ajna',
    "5" => 'sacral',
    "6" => 'solar plexus',
    "7" => 'g center',
    "8" => 'throat',
    "9" => 'sacral',
    "10" => 'g center',
    "11" => 'ajna',
    "12" => 'throat',
    "13" => 'g center',
    "14" => 'sacral',
    "15" => 'g center',
    "16" => 'throat',
    "17" => 'ajna',
    "18" => 'spleen',
    "19" => 'root',
    "20" => 'throat',
    "21" => 'ego',
    "22" => 'solar plexus',
    "23" => 'throat',
    "24" => 'ajna',
    "25" => 'g center',
    "26" => 'ego',
    "27" => 'sacral',
    "28" => 'spleen',
    "29" => 'sacral',
    "30" => 'solar plexus',
    "31" => 'throat',
    "32" => 'spleen',
    "33" => 'throat',
    "34" => 'sacral',
    "35" => 'throat',
    "36" => 'solar plexus',
    "37" => 'solar plexus',
    "38" => 'root',
    "39" => 'root',
    "40" => 'ego',
    "41" => 'root',
    "42" => 'sacral',
    "43" => 'ajna',
    "44" => 'spleen',
    "45" => 'throat',
    "46" => 'g center',
    "47" => 'ajna',
    "48" => 'spleen',
    "49" => 'solar plexus',
    "50" => 'spleen',
    "51" => 'ego',
    "52" => 'throat',
    "53" => 'root',
    "54" => 'root',
    "55" => 'solar plexus',
    "56" => 'throat',
    "57" => 'spleen',
    "58" => 'root',
    "59" => 'sacral',
    "60" => 'root',
    "61" => 'head',
    "62" => 'throat',
    "63" => 'head',
    "64" => 'head'
  }.freeze

  PLANET_GLYPHS = {
    sun: '☉',
    earth: '⨁',
    north_node: '☊',
    south_node: '☋',
    moon: '☽',
    mercury: '☿',
    venus: '♀',
    mars: '♂',
    jupiter: '♃',
    saturn: '♄',
    uranus: '♅',
    neptune: '♆',
    pluto: '♇'
  }.freeze

  def find_design_date(birth_date)
    birth_hour = birth_date.hour.to_f + (birth_date.min.to_f / 60) + (birth_date.sec.to_f / 3600)
    jd_birth_date = Swe4r.swe_julday(birth_date.year, birth_date.month, birth_date.day, birth_hour)

    birth_date_sun = Swe4r.swe_calc_ut(jd_birth_date, Swe4r::SE_SUN, Swe4r::SEFLG_MOSEPH)
    birth_date_sun_degrees = birth_date_sun[0]
    start_date = birth_date - 96.days
    end_date = birth_date - 84.days
    start_timestamp = start_date.to_i
    end_timestamp = end_date.to_i
    max_iterations = 100
    design_date = nil

    while design_date.nil? && max_iterations.positive?
      mid_timestamp = (start_timestamp + end_timestamp) / 2
      mid_date = Time.at(mid_timestamp).utc
      mid_date_hour = mid_date.hour.to_f + (mid_date.min.to_f / 60) + (mid_date.sec.to_f / 3600)
      jd_mid_date = Swe4r.swe_julday(mid_date.year, mid_date.month, mid_date.day, mid_date_hour)
      mid_date_sun = Swe4r.swe_calc_ut(jd_mid_date, Swe4r::SE_SUN, Swe4r::SEFLG_MOSEPH)
      sun_degrees = mid_date_sun[0]
      difference = (birth_date_sun_degrees - sun_degrees).abs
      difference = (360 - difference) if difference > 180
      if difference < 88.00001 && difference > 87.99999
        design_date = Time.at(mid_timestamp)
      elsif difference > 88
        start_timestamp = mid_timestamp
      else
        end_timestamp = mid_timestamp
      end
      max_iterations -= 1
    end

    design_date
  end
end