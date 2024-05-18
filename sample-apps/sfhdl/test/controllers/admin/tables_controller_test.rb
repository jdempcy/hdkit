require "test_helper"

class Admin::TablesControllerTest < ActionDispatch::IntegrationTest
  test "should get general" do
    get admin_tables_general_url
    assert_response :success
  end
end
