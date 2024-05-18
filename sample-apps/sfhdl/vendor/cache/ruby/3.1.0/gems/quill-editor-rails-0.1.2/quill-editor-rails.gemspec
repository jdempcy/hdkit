require_relative 'lib/quill/editor/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "quill-editor-rails"
  spec.version       = Quill::Editor::Rails::VERSION
  spec.authors       = ["yanzijun"]
  spec.email         = ["c75a90@gmail.com"]

  spec.summary       = %q{The quill editor for rails}
  spec.description   = %q{You could use quill editor in rails via importing quill in application.js directly}
  spec.homepage      = "https://github.com/yanzijun/quill-editor-rails"
  spec.license       = "BSD-3-Clause"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.3.0")

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/yanzijun/quill-editor-rails"
  spec.metadata["changelog_uri"] = "https://github.com/yanzijun/quill-editor-rails"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
end
