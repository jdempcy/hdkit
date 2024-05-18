require "rails"

module BootstrapIconsHelper
  class Railtie < Rails::Railtie
    initializer "bootstrap-icons-helper.helper" do
      ActionView::Base.send :include, BootstrapIconsHelper
    end
  end
end