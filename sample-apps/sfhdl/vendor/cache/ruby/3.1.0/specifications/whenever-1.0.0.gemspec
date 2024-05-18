# -*- encoding: utf-8 -*-
# stub: whenever 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "whenever".freeze
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Javan Makhmali".freeze]
  s.date = "2019-06-13"
  s.description = "Clean ruby syntax for writing and deploying cron jobs.".freeze
  s.email = ["javan@javan.us".freeze]
  s.executables = ["whenever".freeze, "wheneverize".freeze]
  s.files = ["bin/whenever".freeze, "bin/wheneverize".freeze]
  s.homepage = "https://github.com/javan/whenever".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.3".freeze)
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Cron jobs in ruby.".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<chronic>.freeze, [">= 0.6.3"])
    s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    s.add_development_dependency(%q<mocha>.freeze, [">= 0.9.5"])
    s.add_development_dependency(%q<minitest>.freeze, [">= 0"])
    s.add_development_dependency(%q<appraisal>.freeze, [">= 0"])
  else
    s.add_dependency(%q<chronic>.freeze, [">= 0.6.3"])
    s.add_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<mocha>.freeze, [">= 0.9.5"])
    s.add_dependency(%q<minitest>.freeze, [">= 0"])
    s.add_dependency(%q<appraisal>.freeze, [">= 0"])
  end
end
