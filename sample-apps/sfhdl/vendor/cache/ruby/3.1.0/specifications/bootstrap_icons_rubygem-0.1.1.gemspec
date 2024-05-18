# -*- encoding: utf-8 -*-
# stub: bootstrap_icons_rubygem 0.1.1 ruby lib

Gem::Specification.new do |s|
  s.name = "bootstrap_icons_rubygem".freeze
  s.version = "0.1.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["hfpp2012".freeze]
  s.date = "2022-01-27"
  s.description = "bootstrap_icons_rubygem provides the Bootstrap icons web fonts and stylesheets as a Rails engine for use with the asset pipeline.".freeze
  s.email = ["hfpp2012@gmail.com".freeze]
  s.homepage = "https://github.com/hfpp2012/bootstrap_icons_rubygem".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.6.0".freeze)
  s.rubygems_version = "3.3.7".freeze
  s.summary = "an asset gemification of the bootstrap icon font library".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<railties>.freeze, [">= 4.2"])
    s.add_development_dependency(%q<activesupport>.freeze, [">= 0"])
    s.add_development_dependency(%q<sassc-rails>.freeze, [">= 0"])
  else
    s.add_dependency(%q<railties>.freeze, [">= 4.2"])
    s.add_dependency(%q<activesupport>.freeze, [">= 0"])
    s.add_dependency(%q<sassc-rails>.freeze, [">= 0"])
  end
end
