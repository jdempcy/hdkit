# -*- encoding: utf-8 -*-
# stub: dry-core 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "dry-core".freeze
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "allowed_push_host" => "https://rubygems.org", "bug_tracker_uri" => "https://github.com/dry-rb/dry-core/issues", "changelog_uri" => "https://github.com/dry-rb/dry-core/blob/main/CHANGELOG.md", "source_code_uri" => "https://github.com/dry-rb/dry-core" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Nikita Shilnikov".freeze]
  s.date = "2022-11-04"
  s.description = "A toolset of small support modules used throughout the dry-rb ecosystem".freeze
  s.email = ["fg@flashgordon.ru".freeze]
  s.homepage = "https://dry-rb.org/gems/dry-core".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7.0".freeze)
  s.rubygems_version = "3.3.7".freeze
  s.summary = "A toolset of small support modules used throughout the dry-rb ecosystem".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<concurrent-ruby>.freeze, ["~> 1.0"])
    s.add_runtime_dependency(%q<zeitwerk>.freeze, ["~> 2.6"])
    s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
  else
    s.add_dependency(%q<concurrent-ruby>.freeze, ["~> 1.0"])
    s.add_dependency(%q<zeitwerk>.freeze, ["~> 2.6"])
    s.add_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
  end
end
