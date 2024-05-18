# -*- encoding: utf-8 -*-
# stub: remixicon 1.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "remixicon".freeze
  s.version = "1.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "homepage_uri" => "https://github.com/hfpp2012/remixicon-rails", "source_code_uri" => "https://github.com/hfpp2012/remixicon-rails" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["hfpp2012".freeze]
  s.date = "2022-03-07"
  s.email = ["hfpp2012@gmail.com".freeze]
  s.homepage = "https://github.com/hfpp2012/remixicon-rails".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7.0".freeze)
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Remixicon rubygem for Rails / Sprockets / Hanami / etc".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<rails>.freeze, [">= 5.0", "< 8.0"])
    s.add_runtime_dependency(%q<sprockets-rails>.freeze, ["~> 3.4.2"])
  else
    s.add_dependency(%q<rails>.freeze, [">= 5.0", "< 8.0"])
    s.add_dependency(%q<sprockets-rails>.freeze, ["~> 3.4.2"])
  end
end
