
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "smart_kv/version"

Gem::Specification.new do |spec|
  spec.name          = "smart_kv"
  spec.version       = SmartKv::VERSION
  spec.authors       = ["Adrian Setyadi"]
  spec.email         = ["a.styd@yahoo.com"]

  spec.summary       = %q{Smart checks for your options or configurations.}
  spec.description   = %q{Write options or configurations without worry of typos and the need to remember all the keys.}
  spec.homepage      = "https://github.com/styd/smart_kv"
  spec.license       = "MIT"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 12.3"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "coveralls", "~> 0.8.22"
  spec.add_development_dependency "pry", "~> 0.12"
  spec.add_development_dependency "pry-byebug", "~> 3.6"
  spec.add_development_dependency "pry-doc"
end
