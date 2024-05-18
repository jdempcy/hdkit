# -*- encoding: utf-8 -*-
# stub: capistrano-rails 1.6.2 ruby lib

Gem::Specification.new do |s|
  s.name = "capistrano-rails".freeze
  s.version = "1.6.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "changelog_uri" => "https://github.com/capistrano/rails/releases" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Tom Clements".freeze, "Lee Hambley".freeze, "Kir Shatrov".freeze]
  s.date = "2022-02-20"
  s.description = "Rails specific Capistrano tasks".freeze
  s.email = ["seenmyfate@gmail.com".freeze, "lee.hambley@gmail.com".freeze, "shatrov@me.com".freeze]
  s.homepage = "https://github.com/capistrano/rails".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Rails specific Capistrano tasks".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<capistrano>.freeze, ["~> 3.1"])
    s.add_runtime_dependency(%q<capistrano-bundler>.freeze, [">= 1.1", "< 3"])
    s.add_development_dependency(%q<danger>.freeze, [">= 0"])
  else
    s.add_dependency(%q<capistrano>.freeze, ["~> 3.1"])
    s.add_dependency(%q<capistrano-bundler>.freeze, [">= 1.1", "< 3"])
    s.add_dependency(%q<danger>.freeze, [">= 0"])
  end
end
