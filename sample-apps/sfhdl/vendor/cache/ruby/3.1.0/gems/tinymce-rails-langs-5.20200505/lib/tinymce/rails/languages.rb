module TinyMCE::Rails
  class Languages < ::Rails::Engine
    config.assets.precompile << "tinymce-rails-langs.manifest.js" # Sprockets 4 manifest
  end
end
