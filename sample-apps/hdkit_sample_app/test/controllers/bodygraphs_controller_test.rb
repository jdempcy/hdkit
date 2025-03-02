require "test_helper"

class BodygraphsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bodygraph = bodygraphs(:one)
  end

  test "should get index" do
    get bodygraphs_url
    assert_response :success
  end

  test "should get new" do
    get new_bodygraph_url
    assert_response :success
  end

  test "should create bodygraph" do
    assert_difference("Bodygraph.count") do
      post bodygraphs_url, params: { bodygraph: { ajna_defined: @bodygraph.ajna_defined, all_activated_gates: @bodygraph.all_activated_gates, aura_type: @bodygraph.aura_type, birth_city: @bodygraph.birth_city, birth_country: @bodygraph.birth_country, birth_date: @bodygraph.birth_date, birth_date_local: @bodygraph.birth_date_local, birth_date_utc: @bodygraph.birth_date_utc, birth_time: @bodygraph.birth_time, cognition: @bodygraph.cognition, definition: @bodygraph.definition, design_activations: @bodygraph.design_activations, design_date_utc: @bodygraph.design_date_utc, design_nodes_tone: @bodygraph.design_nodes_tone, determination: @bodygraph.determination, ego_defined: @bodygraph.ego_defined, environment: @bodygraph.environment, g_center_defined: @bodygraph.g_center_defined, head_defined: @bodygraph.head_defined, incarnation_cross: @bodygraph.incarnation_cross, inner_authority: @bodygraph.inner_authority, latitude: @bodygraph.latitude, longitude: @bodygraph.longitude, motivation: @bodygraph.motivation, name: @bodygraph.name, personality_activations: @bodygraph.personality_activations, personality_nodes_tone: @bodygraph.personality_nodes_tone, profile: @bodygraph.profile, root_defined: @bodygraph.root_defined, sacral_defined: @bodygraph.sacral_defined, sense: @bodygraph.sense, solar_plexus_defined: @bodygraph.solar_plexus_defined, spleen_defined: @bodygraph.spleen_defined, throat_defined: @bodygraph.throat_defined, timezone: @bodygraph.timezone, variable: @bodygraph.variable, view: @bodygraph.view } }
    end

    assert_redirected_to bodygraph_url(Bodygraph.last)
  end

  test "should show bodygraph" do
    get bodygraph_url(@bodygraph)
    assert_response :success
  end

  test "should get edit" do
    get edit_bodygraph_url(@bodygraph)
    assert_response :success
  end

  test "should update bodygraph" do
    patch bodygraph_url(@bodygraph), params: { bodygraph: { ajna_defined: @bodygraph.ajna_defined, all_activated_gates: @bodygraph.all_activated_gates, aura_type: @bodygraph.aura_type, birth_city: @bodygraph.birth_city, birth_country: @bodygraph.birth_country, birth_date: @bodygraph.birth_date, birth_date_local: @bodygraph.birth_date_local, birth_date_utc: @bodygraph.birth_date_utc, birth_time: @bodygraph.birth_time, cognition: @bodygraph.cognition, definition: @bodygraph.definition, design_activations: @bodygraph.design_activations, design_date_utc: @bodygraph.design_date_utc, design_nodes_tone: @bodygraph.design_nodes_tone, determination: @bodygraph.determination, ego_defined: @bodygraph.ego_defined, environment: @bodygraph.environment, g_center_defined: @bodygraph.g_center_defined, head_defined: @bodygraph.head_defined, incarnation_cross: @bodygraph.incarnation_cross, inner_authority: @bodygraph.inner_authority, latitude: @bodygraph.latitude, longitude: @bodygraph.longitude, motivation: @bodygraph.motivation, name: @bodygraph.name, personality_activations: @bodygraph.personality_activations, personality_nodes_tone: @bodygraph.personality_nodes_tone, profile: @bodygraph.profile, root_defined: @bodygraph.root_defined, sacral_defined: @bodygraph.sacral_defined, sense: @bodygraph.sense, solar_plexus_defined: @bodygraph.solar_plexus_defined, spleen_defined: @bodygraph.spleen_defined, throat_defined: @bodygraph.throat_defined, timezone: @bodygraph.timezone, variable: @bodygraph.variable, view: @bodygraph.view } }
    assert_redirected_to bodygraph_url(@bodygraph)
  end

  test "should destroy bodygraph" do
    assert_difference("Bodygraph.count", -1) do
      delete bodygraph_url(@bodygraph)
    end

    assert_redirected_to bodygraphs_url
  end
end
