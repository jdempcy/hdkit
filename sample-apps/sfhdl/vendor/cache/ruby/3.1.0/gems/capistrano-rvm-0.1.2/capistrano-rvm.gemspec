# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |gem|
  gem.name          = "capistrano-rvm"
  gem.version       = '0.1.2'
  gem.authors       = ["Kir Shatrov"]
  gem.email         = ["shatrov@me.com"]
  gem.description   = %q{RVM integration for Capistrano}
  gem.summary       = %q{RVM integration for Capistrano}
  gem.homepage      = "https://github.com/capistrano/rvm"

  gem.files         = `git ls-files`.split($/)
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_dependency 'capistrano', '~> 3.0'
  gem.add_dependency 'sshkit', '~> 1.2'

end
