require 'test_helper'

class BodygraphDataTest < ActiveSupport::TestCase
  test "single definition with one connected area" do
    # Create a single connected area: Sacral-Throat connection via channel [20, 34]
    personality_activations = {
      sun_gate: 34, earth_gate: 20, sun_line: 1.0, earth_line: 1.0,
      north_node_gate: 1, south_node_gate: 2, north_node_line: 1.0, south_node_line: 1.0,
      moon_gate: 25, mercury_gate: 26, venus_gate: 27, mars_gate: 28,
      jupiter_gate: 29, saturn_gate: 30, uranus_gate: 31, neptune_gate: 32, pluto_gate: 33
    }
    
    design_activations = {
      sun_gate: 35, earth_gate: 36, sun_line: 1.0, earth_line: 1.0,
      north_node_gate: 37, south_node_gate: 38, north_node_line: 1.0, south_node_line: 1.0,
      moon_gate: 39, mercury_gate: 40, venus_gate: 41, mars_gate: 42,
      jupiter_gate: 43, saturn_gate: 44, uranus_gate: 45, neptune_gate: 46, pluto_gate: 47
    }
    
    bodygraph_data = BodygraphData.new(personality_activations, design_activations)
    assert_equal 'Single', bodygraph_data.definition
  end
  
  test "split definition with two separate areas" do
    # Area 1: Sacral-Throat connection via channel [20, 34]
    # Area 2: Head-Ajna connection via channel [61, 24]
    personality_activations = {
      sun_gate: 34, earth_gate: 20, sun_line: 1.0, earth_line: 1.0,  # Channel [20, 34]
      north_node_gate: 61, south_node_gate: 24, north_node_line: 1.0, south_node_line: 1.0,  # Channel [61, 24]
      moon_gate: 1, mercury_gate: 2, venus_gate: 3, mars_gate: 4,
      jupiter_gate: 5, saturn_gate: 6, uranus_gate: 7, neptune_gate: 8, pluto_gate: 9
    }
    
    design_activations = {
      sun_gate: 10, earth_gate: 11, sun_line: 1.0, earth_line: 1.0,
      north_node_gate: 12, south_node_gate: 13, north_node_line: 1.0, south_node_line: 1.0,
      moon_gate: 14, mercury_gate: 15, venus_gate: 16, mars_gate: 17,
      jupiter_gate: 18, saturn_gate: 19, uranus_gate: 21, neptune_gate: 22, pluto_gate: 23
    }
    
    bodygraph_data = BodygraphData.new(personality_activations, design_activations)
    assert_equal 'Split', bodygraph_data.definition
  end
  
  test "channels that bridge areas should merge into single definition" do
    # Test the key fix: channels that bridge separate areas should merge them
    # This tests the core issue that was fixed - bridging channels merging areas properly
    # Area 1: Head-Ajna via channel [61, 24]
    # Area 2: Sacral-Throat via channel [20, 34]  
    # Bridge: Ajna-Throat via channel [43, 23] connects the two areas
    personality_activations = {
      sun_gate: 61, earth_gate: 24, sun_line: 1.0, earth_line: 1.0,  # Channel [61, 24] Head-Ajna
      north_node_gate: 34, south_node_gate: 20, north_node_line: 1.0, south_node_line: 1.0,  # Channel [20, 34] Sacral-Throat
      moon_gate: 43, mercury_gate: 23, venus_gate: 1, mars_gate: 2,  # Channel [43, 23] Ajna-Throat (bridges)
      jupiter_gate: 3, saturn_gate: 4, uranus_gate: 5, neptune_gate: 6, pluto_gate: 7
    }
    
    design_activations = {
      sun_gate: 8, earth_gate: 9, sun_line: 1.0, earth_line: 1.0,
      north_node_gate: 10, south_node_gate: 11, north_node_line: 1.0, south_node_line: 1.0,
      moon_gate: 12, mercury_gate: 13, venus_gate: 14, mars_gate: 15,
      jupiter_gate: 16, saturn_gate: 17, uranus_gate: 18, neptune_gate: 19, pluto_gate: 21
    }
    
    bodygraph_data = BodygraphData.new(personality_activations, design_activations)
    # Should be 'Single' because the bridging channel [43, 23] connects the Head-Ajna area to the Sacral-Throat area
    assert_equal 'Single', bodygraph_data.definition
  end
  
  test "definition method correctly calculates from activated channels" do
    # Test that definition is calculated dynamically from channels, not configured
    # This verifies the core functionality works
    personality_activations = {
      sun_gate: 34, earth_gate: 20, sun_line: 1.0, earth_line: 1.0,  # Channel [20, 34] Sacral-Throat
      north_node_gate: 1, south_node_gate: 2, north_node_line: 1.0, south_node_line: 1.0,
      moon_gate: 3, mercury_gate: 4, venus_gate: 5, mars_gate: 6,
      jupiter_gate: 7, saturn_gate: 8, uranus_gate: 9, neptune_gate: 10, pluto_gate: 11
    }
    
    design_activations = {
      sun_gate: 12, earth_gate: 13, sun_line: 1.0, earth_line: 1.0,
      north_node_gate: 14, south_node_gate: 15, north_node_line: 1.0, south_node_line: 1.0,
      moon_gate: 16, mercury_gate: 17, venus_gate: 18, mars_gate: 19,
      jupiter_gate: 21, saturn_gate: 22, uranus_gate: 25, neptune_gate: 26, pluto_gate: 27
    }
    
    bodygraph_data = BodygraphData.new(personality_activations, design_activations)
    definition_result = bodygraph_data.definition
    
    # Should return a valid definition type
    assert_includes ['None', 'Single', 'Split', 'Triple Split', 'Quad Split'], definition_result
    
    # With channel [20, 34], should be 'Single'
    assert_equal 'Single', definition_result
  end
end