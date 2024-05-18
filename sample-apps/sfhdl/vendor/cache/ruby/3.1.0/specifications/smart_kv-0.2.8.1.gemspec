# -*- encoding: utf-8 -*-
# stub: smart_kv 0.2.8.1 ruby lib

Gem::Specification.new do |s|
  s.name = "smart_kv".freeze
  s.version = "0.2.8.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Adrian Setyadi".freeze]
  s.bindir = "exe".freeze
  s.date = "2020-04-05"
  s.description = "Write options or configurations without worry of typos and the need to remember all the keys.".freeze
  s.email = ["a.styd@yahoo.com".freeze]
  s.homepage = "https://github.com/styd/smart_kv".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Smart checks for your options or configurations.".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bundler>.freeze, ["~> 2.0"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 12.3"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_development_dependency(%q<coveralls>.freeze, ["~> 0.8.22"])
    s.add_development_dependency(%q<pry>.freeze, ["~> 0.12"])
    s.add_development_dependency(%q<pry-byebug>.freeze, ["~> 3.6"])
    s.add_development_dependency(%q<pry-doc>.freeze, [">= 0"])
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 2.0"])
    s.add_dependency(%q<rake>.freeze, ["~> 12.3"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<coveralls>.freeze, ["~> 0.8.22"])
    s.add_dependency(%q<pry>.freeze, ["~> 0.12"])
    s.add_dependency(%q<pry-byebug>.freeze, ["~> 3.6"])
    s.add_dependency(%q<pry-doc>.freeze, [">= 0"])
  end
end
