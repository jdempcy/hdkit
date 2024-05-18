require "test_helper"

class Admin::FormsControllerTest < ActionDispatch::IntegrationTest
  test "should get editors" do
    get admin_forms_editors_url
    assert_response :success
  end
end
