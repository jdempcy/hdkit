require "test_helper"

class Admin::IconsControllerTest < ActionDispatch::IntegrationTest
  test "should get bootstrap" do
    get admin_icons_bootstrap_url
    assert_response :success
  end
end
