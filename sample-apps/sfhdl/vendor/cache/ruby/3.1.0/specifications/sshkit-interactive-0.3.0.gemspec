# -*- encoding: utf-8 -*-
# stub: sshkit-interactive 0.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "sshkit-interactive".freeze
  s.version = "0.3.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Aidan Feldman".freeze]
  s.date = "2018-02-03"
  s.email = ["aidan.feldman@gmail.com".freeze]
  s.homepage = "https://github.com/afeld/sshkit-interactive".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "An SSHKit backend that allows you to execute interactive commands on your servers.".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<sshkit>.freeze, ["~> 1.12"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 12.0.0"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.6.0"])
  else
    s.add_dependency(%q<sshkit>.freeze, ["~> 1.12"])
    s.add_dependency(%q<rake>.freeze, ["~> 12.0.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.6.0"])
  end
end
