# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'sshkit/interactive/version'

Gem::Specification.new do |spec|
  spec.name          = 'sshkit-interactive'
  spec.version       = SSHKit::Interactive::VERSION
  spec.authors       = ['Aidan Feldman']
  spec.email         = ['aidan.feldman@gmail.com']
  spec.summary       = %q{An SSHKit backend that allows you to execute interactive commands on your servers. }
  spec.homepage      = 'https://github.com/afeld/sshkit-interactive'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_dependency 'sshkit', '~> 1.12'

  spec.add_development_dependency 'rake',  '~> 12.0.0'
  spec.add_development_dependency 'rspec', '~> 3.6.0'
end
