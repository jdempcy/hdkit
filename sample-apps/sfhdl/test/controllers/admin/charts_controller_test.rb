require "test_helper"

class Admin::ChartsControllerTest < ActionDispatch::IntegrationTest
  test "should get chartjs" do
    get admin_charts_chartjs_url
    assert_response :success
  end
end
