# -*- encoding: utf-8 -*-
# stub: tinymce-rails-langs 5.20200505 ruby lib

Gem::Specification.new do |s|
  s.name = "tinymce-rails-langs".freeze
  s.version = "5.20200505"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sam Pohlenz".freeze]
  s.date = "2020-05-06"
  s.email = "sam@sampohlenz.com".freeze
  s.homepage = "https://github.com/spohlenz/tinymce-rails-langs".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Additional language packs for tinymce-rails.".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<tinymce-rails>.freeze, ["~> 5.0"])
  else
    s.add_dependency(%q<tinymce-rails>.freeze, ["~> 5.0"])
  end
end
