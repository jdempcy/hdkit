# -*- encoding: utf-8 -*-
# stub: capistrano-db-tasks 0.6 ruby lib

Gem::Specification.new do |s|
  s.name = "capistrano-db-tasks".freeze
  s.version = "0.6"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sebastien Gruhier".freeze]
  s.date = "2016-12-14"
  s.description = "A collection of capistrano tasks for syncing assets and databases".freeze
  s.email = ["sebastien.gruhier@xilinus.com".freeze]
  s.homepage = "https://github.com/sgruhier/capistrano-db-tasks".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "A collection of capistrano tasks for syncing assets and databases".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<capistrano>.freeze, [">= 3.0.0"])
  else
    s.add_dependency(%q<capistrano>.freeze, [">= 3.0.0"])
  end
end
