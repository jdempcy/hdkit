# frozen_string_literal: true

require 'remixicon/version'

module Remixicon
  class << self
    # Inspired by Kaminari
    def load!
      if rails?
        register_rails_engine
      elsif hanami?
        register_hanami
      elsif sprockets?
        register_sprockets
      elsif defined?(::Sass) && ::Sass.respond_to?(:load_paths)
        # The deprecated `sass` gem:
        ::Sass.load_paths << stylesheets_path
      end

      if defined?(::Sass::Script::Value::Number)
        ::Sass::Script::Value::Number.precision = [6, ::Sass::Script::Value::Number.precision].max
      end
    end

    # Paths
    def gem_path
      @gem_path ||= File.expand_path '..', File.dirname(__FILE__)
    end

    def stylesheets_path
      File.join assets_path, 'stylesheets'
    end

    def fonts_path
      File.join assets_path, 'fonts'
    end

    def assets_path
      @assets_path ||= File.join gem_path, 'assets'
    end

    # Environment detection helpers
    def sprockets?
      defined?(::Sprockets)
    end

    def rails?
      defined?(::Rails)
    end

    def hanami?
      defined?(::Hanami)
    end

    private

    def register_rails_engine
      require 'remixicon/engine'
    end

    def register_sprockets
      Sprockets.append_path(stylesheets_path)
      Sprockets.append_path(fonts_path)
    end

    def register_hanami
      Hanami::Assets.sources << assets_path
    end
  end
end

Remixicon.load!

