# frozen_string_literal: true

lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'remixicon/version'

Gem::Specification.new do |spec|
  spec.name = "remixicon"
  spec.version = Remixicon::VERSION
  spec.authors = ["hfpp2012"]
  spec.email = ["hfpp2012@gmail.com"]
  spec.license  = 'MIT'

  spec.summary = "Remixicon rubygem for Rails / Sprockets / Hanami / etc"
  spec.homepage = "https://github.com/hfpp2012/remixicon-rails"
  spec.required_ruby_version = '>= 2.7.0'

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/hfpp2012/remixicon-rails"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = `git ls-files`.split("\n")

  spec.add_dependency 'rails', '>= 5.0', '< 8.0'
  spec.add_dependency 'sprockets-rails', '~> 3.4.2'
  # Uncomment to register a new dependency of your gem
  # spec.add_dependency "example-gem", "~> 1.0"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end
