# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'capistrano/rails/console/version'

Gem::Specification.new do |spec|
  spec.name          = 'capistrano-rails-console'
  spec.version       = Capistrano::Rails::Console::VERSION
  spec.authors       = ['Florian Schwab']
  spec.email         = ['me@ydkn.de']
  spec.description   = %q{Remote rails console for capistrano}
  spec.summary       = %q{Remote rails console for capistrano}
  spec.homepage      = 'https://github.com/ydkn/capistrano-rails-console'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_dependency 'capistrano',         '>= 3.5.0', '< 4.0.0'
  spec.add_dependency 'sshkit-interactive', '~> 0.3.0'

  spec.add_development_dependency 'bundler'
  spec.add_development_dependency 'rake'
end
