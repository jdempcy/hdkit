require "application_system_test_case"

class BodygraphsTest < ApplicationSystemTestCase
  setup do
    @bodygraph = bodygraphs(:one)
  end

  test "visiting the index" do
    visit bodygraphs_url
    assert_selector "h1", text: "Bodygraphs"
  end

  test "should create bodygraph" do
    visit bodygraphs_url
    click_on "New bodygraph"

    check "Ajna defined" if @bodygraph.ajna_defined
    fill_in "All activated gates", with: @bodygraph.all_activated_gates
    fill_in "Aura type", with: @bodygraph.aura_type
    fill_in "Birth city", with: @bodygraph.birth_city
    fill_in "Birth country", with: @bodygraph.birth_country
    fill_in "Birth date", with: @bodygraph.birth_date
    fill_in "Birth date local", with: @bodygraph.birth_date_local
    fill_in "Birth date utc", with: @bodygraph.birth_date_utc
    fill_in "Birth time", with: @bodygraph.birth_time
    fill_in "Cognition", with: @bodygraph.cognition
    fill_in "Definition", with: @bodygraph.definition
    fill_in "Design activations", with: @bodygraph.design_activations
    fill_in "Design date utc", with: @bodygraph.design_date_utc
    fill_in "Design nodes tone", with: @bodygraph.design_nodes_tone
    fill_in "Determination", with: @bodygraph.determination
    check "Ego defined" if @bodygraph.ego_defined
    fill_in "Environment", with: @bodygraph.environment
    check "G center defined" if @bodygraph.g_center_defined
    check "Head defined" if @bodygraph.head_defined
    fill_in "Incarnation cross", with: @bodygraph.incarnation_cross
    fill_in "Inner authority", with: @bodygraph.inner_authority
    fill_in "Latitude", with: @bodygraph.latitude
    fill_in "Longitude", with: @bodygraph.longitude
    fill_in "Motivation", with: @bodygraph.motivation
    fill_in "Name", with: @bodygraph.name
    fill_in "Personality activations", with: @bodygraph.personality_activations
    fill_in "Personality nodes tone", with: @bodygraph.personality_nodes_tone
    fill_in "Profile", with: @bodygraph.profile
    check "Root defined" if @bodygraph.root_defined
    check "Sacral defined" if @bodygraph.sacral_defined
    fill_in "Sense", with: @bodygraph.sense
    check "Solar plexus defined" if @bodygraph.solar_plexus_defined
    check "Spleen defined" if @bodygraph.spleen_defined
    check "Throat defined" if @bodygraph.throat_defined
    fill_in "Timezone", with: @bodygraph.timezone
    fill_in "Variable", with: @bodygraph.variable
    fill_in "View", with: @bodygraph.view
    click_on "Create Bodygraph"

    assert_text "Bodygraph was successfully created"
    click_on "Back"
  end

  test "should update Bodygraph" do
    visit bodygraph_url(@bodygraph)
    click_on "Edit this bodygraph", match: :first

    check "Ajna defined" if @bodygraph.ajna_defined
    fill_in "All activated gates", with: @bodygraph.all_activated_gates
    fill_in "Aura type", with: @bodygraph.aura_type
    fill_in "Birth city", with: @bodygraph.birth_city
    fill_in "Birth country", with: @bodygraph.birth_country
    fill_in "Birth date", with: @bodygraph.birth_date
    fill_in "Birth date local", with: @bodygraph.birth_date_local.to_s
    fill_in "Birth date utc", with: @bodygraph.birth_date_utc.to_s
    fill_in "Birth time", with: @bodygraph.birth_time
    fill_in "Cognition", with: @bodygraph.cognition
    fill_in "Definition", with: @bodygraph.definition
    fill_in "Design activations", with: @bodygraph.design_activations
    fill_in "Design date utc", with: @bodygraph.design_date_utc.to_s
    fill_in "Design nodes tone", with: @bodygraph.design_nodes_tone
    fill_in "Determination", with: @bodygraph.determination
    check "Ego defined" if @bodygraph.ego_defined
    fill_in "Environment", with: @bodygraph.environment
    check "G center defined" if @bodygraph.g_center_defined
    check "Head defined" if @bodygraph.head_defined
    fill_in "Incarnation cross", with: @bodygraph.incarnation_cross
    fill_in "Inner authority", with: @bodygraph.inner_authority
    fill_in "Latitude", with: @bodygraph.latitude
    fill_in "Longitude", with: @bodygraph.longitude
    fill_in "Motivation", with: @bodygraph.motivation
    fill_in "Name", with: @bodygraph.name
    fill_in "Personality activations", with: @bodygraph.personality_activations
    fill_in "Personality nodes tone", with: @bodygraph.personality_nodes_tone
    fill_in "Profile", with: @bodygraph.profile
    check "Root defined" if @bodygraph.root_defined
    check "Sacral defined" if @bodygraph.sacral_defined
    fill_in "Sense", with: @bodygraph.sense
    check "Solar plexus defined" if @bodygraph.solar_plexus_defined
    check "Spleen defined" if @bodygraph.spleen_defined
    check "Throat defined" if @bodygraph.throat_defined
    fill_in "Timezone", with: @bodygraph.timezone
    fill_in "Variable", with: @bodygraph.variable
    fill_in "View", with: @bodygraph.view
    click_on "Update Bodygraph"

    assert_text "Bodygraph was successfully updated"
    click_on "Back"
  end

  test "should destroy Bodygraph" do
    visit bodygraph_url(@bodygraph)
    click_on "Destroy this bodygraph", match: :first

    assert_text "Bodygraph was successfully destroyed"
  end
end
