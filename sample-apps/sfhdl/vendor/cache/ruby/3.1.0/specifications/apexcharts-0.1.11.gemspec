# -*- encoding: utf-8 -*-
# stub: apexcharts 0.1.11 ruby lib

Gem::Specification.new do |s|
  s.name = "apexcharts".freeze
  s.version = "0.1.11"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Adrian Setyadi".freeze]
  s.date = "2021-08-15"
  s.description = "Create beautiful, interactive, and responsive web charts in ruby app powered by apexcharts.js.".freeze
  s.email = ["a.styd@yahoo.com".freeze]
  s.homepage = "https://github.com/styd/apexcharts.rb".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Awesome charts for your ruby app".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<smart_kv>.freeze, ["~> 0.2.8"])
    s.add_runtime_dependency(%q<dry-schema>.freeze, ["~> 1.5"])
    s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_development_dependency(%q<nokogiri>.freeze, [">= 0"])
    s.add_development_dependency(%q<pry>.freeze, [">= 0"])
    s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
    s.add_development_dependency(%q<rubocop>.freeze, [">= 0"])
    s.add_development_dependency(%q<simplecov>.freeze, [">= 0"])
  else
    s.add_dependency(%q<smart_kv>.freeze, ["~> 0.2.8"])
    s.add_dependency(%q<dry-schema>.freeze, ["~> 1.5"])
    s.add_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_dependency(%q<nokogiri>.freeze, [">= 0"])
    s.add_dependency(%q<pry>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
    s.add_dependency(%q<rubocop>.freeze, [">= 0"])
    s.add_dependency(%q<simplecov>.freeze, [">= 0"])
  end
end
