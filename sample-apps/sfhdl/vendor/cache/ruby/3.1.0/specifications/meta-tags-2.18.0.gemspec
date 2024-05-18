# -*- encoding: utf-8 -*-
# stub: meta-tags 2.18.0 ruby lib

Gem::Specification.new do |s|
  s.name = "meta-tags".freeze
  s.version = "2.18.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/kpumuk/meta-tags/issues/", "changelog_uri" => "https://github.com/kpumuk/meta-tags/blob/main/CHANGELOG.md", "documentation_uri" => "https://rubydoc.info/github/kpumuk/meta-tags/", "homepage_uri" => "https://github.com/kpumuk/meta-tags/", "rubygems_mfa_required" => "true", "source_code_uri" => "https://github.com/kpumuk/meta-tags/" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Dmytro Shteflyuk".freeze]
  s.bindir = "exe".freeze
  s.cert_chain = ["-----BEGIN CERTIFICATE-----\nMIIDODCCAiCgAwIBAgIBATANBgkqhkiG9w0BAQsFADAjMSEwHwYDVQQDDBhrcHVt\ndWsvREM9a3B1bXVrL0RDPWluZm8wHhcNMjIwNzA1MjIyODU4WhcNMjMwNzA1MjIy\nODU4WjAjMSEwHwYDVQQDDBhrcHVtdWsvREM9a3B1bXVrL0RDPWluZm8wggEiMA0G\nCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8NmK6GXPiE/q7PDbj7nNdw3pa8a6Q\nIDxLtc7kW95e1mh0TVgOE8kvGegGtRtjvhXVGTTFtZ+yMD/0DCfTM2oUQYk5oYpO\nZGrCfbNIdZauf4WYsnJtKOTrRoqFMwpL5PlBDKczB2y5lUmQs2HIsjQ0Q21wdKyy\n7tXiZPoCoJ+kH+b4/d4dcNvAXVnWgO2HoLW5oqWfqY5swkAHzwHLU+rlxxuHUqOy\n8/Y4hUSOXVIsxWxl3EapENm+QAfBRZn3L26hEb80CgSAp8m47Cj9DaSd7xoDtrIe\nRryRTj5NVZbq9p1/WRc5zxD9QhAEPjRa5ikbd+eWebIDpAKI0hpyC/9bAgMBAAGj\ndzB1MAkGA1UdEwQCMAAwCwYDVR0PBAQDAgSwMB0GA1UdDgQWBBT2uFRXNWDpVdbv\n+xBk8DAgJPGBPTAdBgNVHREEFjAUgRJrcHVtdWtAa3B1bXVrLmluZm8wHQYDVR0S\nBBYwFIESa3B1bXVrQGtwdW11ay5pbmZvMA0GCSqGSIb3DQEBCwUAA4IBAQBa5fMh\nJcbhWBoP3kA32g3yM238fyJlre/ZeE6WIFxcuETff8AgPmk550qpAF/WBtP23X8Q\nkhIFv+bFiuBURvNbuFevs23to7NeNA7XMmEJqjB6fRzO/i/a3bkLG07u+o74MyXe\n3/VAxl4Ce+C3aLwXccsbD+Fe3kQ6ku4ceIh2WebBSkpG3WRANReEAf7lcOt4aGEt\nnkYjyHgDz6/gYamK15XtOivglkTJDwAVGBzF9o6j5IQ9nXho8Vd2P+hiawx76CoT\nANVO3I4ZwTKD12DMFqjalLwbSVVO4wpuMO3tcAgO4q7Fqh2tXTXom/YYl0SFvmx4\nevTPD0iY8lmGP3ZM\n-----END CERTIFICATE-----\n".freeze]
  s.date = "2022-09-15"
  s.description = "Search Engine Optimization (SEO) plugin for Ruby on Rails applications.".freeze
  s.email = ["kpumuk@kpumuk.info".freeze]
  s.homepage = "https://github.com/kpumuk/meta-tags".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.6.0".freeze)
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Collection of SEO helpers for Ruby on Rails.".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<actionpack>.freeze, [">= 3.2.0", "< 7.1"])
    s.add_development_dependency(%q<railties>.freeze, [">= 3.2.0", "< 7.1"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.11.0"])
    s.add_development_dependency(%q<rspec-html-matchers>.freeze, ["~> 0.9.1"])
  else
    s.add_dependency(%q<actionpack>.freeze, [">= 3.2.0", "< 7.1"])
    s.add_dependency(%q<railties>.freeze, [">= 3.2.0", "< 7.1"])
    s.add_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.11.0"])
    s.add_dependency(%q<rspec-html-matchers>.freeze, ["~> 0.9.1"])
  end
end
