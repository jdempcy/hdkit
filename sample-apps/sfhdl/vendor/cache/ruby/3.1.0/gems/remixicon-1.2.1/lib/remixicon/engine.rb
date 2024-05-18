# frozen_string_literal: true

require 'sassc-rails'

module Remixicon
  module Rails
    class Engine < ::Rails::Engine
      initializer 'remixicon.assets' do |app|
        %w(stylesheets fonts).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end
      end
    end
  end
end
