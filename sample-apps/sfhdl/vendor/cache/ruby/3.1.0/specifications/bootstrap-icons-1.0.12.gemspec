# -*- encoding: utf-8 -*-
# stub: bootstrap-icons 1.0.12 ruby lib

Gem::Specification.new do |s|
  s.name = "bootstrap-icons".freeze
  s.version = "1.0.12"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Marcelo Lauxen".freeze]
  s.date = "2022-03-30"
  s.description = "A package that distributes Bootstrap Icons in a gem".freeze
  s.email = ["marcelolauxen16@gmail.com".freeze]
  s.homepage = "https://github.com/marcelolx/bootstrap-icons".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Bootstrap Icons gem".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<nokogiri>.freeze, ["~> 1"])
  else
    s.add_dependency(%q<nokogiri>.freeze, ["~> 1"])
  end
end
