# -*- encoding: utf-8 -*-
# stub: net-ssh 7.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "net-ssh".freeze
  s.version = "7.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "changelog_uri" => "https://github.com/net-ssh/net-ssh/blob/master/CHANGES.txt" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jamis Buck".freeze, "Delano Mandelbaum".freeze, "Mikl\u00F3s Fazekas".freeze]
  s.bindir = "exe".freeze
  s.cert_chain = ["-----BEGIN CERTIFICATE-----\nMIIDQDCCAiigAwIBAgIBATANBgkqhkiG9w0BAQsFADAlMSMwIQYDVQQDDBpuZXRz\nc2gvREM9c29sdXRpb3VzL0RDPWNvbTAeFw0yMTA4MTAwODMyMzBaFw0yMjA4MTAw\nODMyMzBaMCUxIzAhBgNVBAMMGm5ldHNzaC9EQz1zb2x1dGlvdXMvREM9Y29tMIIB\nIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxieE22fR/qmdPKUHyYTyUx2g\nwskLwrCkxay+Tvc97ZZUOwf85LDDDPqhQaTWLvRwnIOMgQE2nBPzwalVclK6a+pW\nx/18KDeZY15vm3Qn5p42b0wi9hUxOqPm3J2hdCLCcgtENgdX21nVzejn39WVqFJO\nlntgSDNW5+kCS8QaRsmIbzj17GKKkrsw39kiQw7FhWfJFeTjddzoZiWwc59KA/Bx\nfBbmDnsMLAtAtauMOxORrbx3EOY7sHku/kSrMg3FXFay7jc6BkbbUij+MjJ/k82l\n4o8o0YO4BAnya90xgEmgOG0LCCxRhuXQFnMDuDjK2XnUe0h4/6NCn94C+z9GsQID\nAQABo3sweTAJBgNVHRMEAjAAMAsGA1UdDwQEAwIEsDAdBgNVHQ4EFgQUBfKiwO2e\nM4NEiRrVG793qEPLYyMwHwYDVR0RBBgwFoEUbmV0c3NoQHNvbHV0aW91cy5jb20w\nHwYDVR0SBBgwFoEUbmV0c3NoQHNvbHV0aW91cy5jb20wDQYJKoZIhvcNAQELBQAD\nggEBABRChgo0Jo+iXSnTpODNongzZoU0sWqwx3/FQVo8nyAyr1qFuiqpSPb4bDbU\nDsVnUn3t0X/gGA8qJhutlmfTpEQCjUeyj2x9rWpD3lvttlGWV6btQ0qN4Dfc2gsw\nrCp9Jpful0HGWhiwfjWfsarqAdtLzIG0UC47IN7LGeCMRJIijOsXQhiZ915eNBEw\ng9+WSSGHkMFt/7vi2pFkvXSC0+RF8ovvRWf4Zw2aYXtJ1GElgi4ZS/s6ZU0gmv20\ni4SfC5m5UXIVZvOBYiMuZ/1B2m6R9xU41027zfOVwRFNtlVDiNfQRq6sDmz44At/\ndv8pkxXDgySe41vzlRXFsgIgz5A=\n-----END CERTIFICATE-----\n".freeze]
  s.date = "2022-06-26"
  s.description = "Net::SSH: a pure-Ruby implementation of the SSH2 client protocol. It allows you to write programs that invoke and interact with processes on remote servers, via SSH2.".freeze
  s.email = ["net-ssh@solutious.com".freeze]
  s.extra_rdoc_files = ["LICENSE.txt".freeze, "README.md".freeze]
  s.files = ["LICENSE.txt".freeze, "README.md".freeze]
  s.homepage = "https://github.com/net-ssh/net-ssh".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.6".freeze)
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Net::SSH: a pure-Ruby implementation of the SSH2 client protocol.".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bcrypt_pbkdf>.freeze, ["~> 1.0"])
    s.add_development_dependency(%q<ed25519>.freeze, ["~> 1.2"])
    s.add_development_dependency(%q<x25519>.freeze, [">= 0"])
    s.add_development_dependency(%q<bundler>.freeze, [">= 1.17"])
    s.add_development_dependency(%q<minitest>.freeze, ["~> 5.10"])
    s.add_development_dependency(%q<mocha>.freeze, ["~> 1.11.2"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 12.0"])
    s.add_development_dependency(%q<rubocop>.freeze, ["~> 1.28.0"])
  else
    s.add_dependency(%q<bcrypt_pbkdf>.freeze, ["~> 1.0"])
    s.add_dependency(%q<ed25519>.freeze, ["~> 1.2"])
    s.add_dependency(%q<x25519>.freeze, [">= 0"])
    s.add_dependency(%q<bundler>.freeze, [">= 1.17"])
    s.add_dependency(%q<minitest>.freeze, ["~> 5.10"])
    s.add_dependency(%q<mocha>.freeze, ["~> 1.11.2"])
    s.add_dependency(%q<rake>.freeze, ["~> 12.0"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 1.28.0"])
  end
end
