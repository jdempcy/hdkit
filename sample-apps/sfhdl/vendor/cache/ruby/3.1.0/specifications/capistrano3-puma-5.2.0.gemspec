# -*- encoding: utf-8 -*-
# stub: capistrano3-puma 5.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "capistrano3-puma".freeze
  s.version = "5.2.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Abdelkader Boudih".freeze]
  s.date = "2021-09-11"
  s.description = "Puma integration for Capistrano 3".freeze
  s.email = ["Terminale@gmail.com".freeze]
  s.homepage = "https://github.com/seuros/capistrano-puma".freeze
  s.licenses = ["MIT".freeze]
  s.post_install_message = "\n    All plugins need to be explicitly installed with install_plugin.\n    Please see README.md\n  ".freeze
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.3".freeze)
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Puma integration for Capistrano".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<capistrano>.freeze, ["~> 3.7"])
    s.add_runtime_dependency(%q<capistrano-bundler>.freeze, [">= 0"])
    s.add_runtime_dependency(%q<puma>.freeze, [">= 4.0", "< 6.0"])
  else
    s.add_dependency(%q<capistrano>.freeze, ["~> 3.7"])
    s.add_dependency(%q<capistrano-bundler>.freeze, [">= 0"])
    s.add_dependency(%q<puma>.freeze, [">= 4.0", "< 6.0"])
  end
end
