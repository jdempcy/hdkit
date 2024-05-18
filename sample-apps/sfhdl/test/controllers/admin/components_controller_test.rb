require "test_helper"

class Admin::ComponentsControllerTest < ActionDispatch::IntegrationTest
  test "should get alert" do
    get admin_components_alert_url
    assert_response :success
  end
end
