require "test_helper"

class Admin::PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get profile" do
    get admin_pages_profile_url
    assert_response :success
  end
end
