source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.0"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use sqlite3 as the database for Active Record
# gem "sqlite3", "~> 1.4"

# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem "jsbundling-rails"

# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem "cssbundling-rails", "~> 1.0"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Redis adapter to run Action Cable in production
gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]

  # Reduces boot times through caching; required in config/boot.rb
  gem "bootsnap", require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
  gem "capistrano", "~> 3.16", require: false
  gem "capistrano-rails", "~> 1.6", require: false
  gem "capistrano-rvm", "~> 0.1.2"
  gem "capistrano3-puma", "~> 5.2"
  gem "capistrano-rails-console", "~> 2.3", require: false
  gem "capistrano-db-tasks", "~> 0.6", require: false
  gem "capistrano-sidekiq", "~> 2.0"
  # fix net-ssh bug for deploy
  gem "ed25519", "~> 1.3"
  gem "bcrypt_pbkdf", "~> 1.1"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end

gem "pg", "~> 1.2"
gem "dotenv-rails", "~> 2.7"
gem "sidekiq", "~> 6.5"
gem "whenever", "~> 1.0", require: false

gem "awesome_print", "~> 1.9"


gem "rails_admin", "~> 3.1.1"
gem "sassc-rails"

gem "pghero", "~> 2.8"

gem "meta-tags", "~> 2.16"

# gem "inline_svg", "~> 1.8"
# gem "font-awesome-rails", "~> 4.7"
# gem "font_awesome5_rails", "~> 1.5"

gem "devise", "~> 4.8"

gem "groupdate", "~> 6.0"
gem "apexcharts", "~> 0.1.11"
# gem "chartkick", "~> 4.1"

gem "ffaker", "~> 2.20"
# gem "faker", "~> 2.19"

group :production do
  # UglifyJS only works with ES5. If you need to compress ES6, ruby-terser is a better option.
  # gem "uglifier"
  gem "terser", "~> 1.1"
end

gem "tinymce-rails", "~> 5.10"
gem "tinymce-rails-langs", "~> 5.20200505"

gem "autoprefixer-rails"
gem "remixicon", "~> 1.0"

# optional: just for generate svg
gem "bootstrap-icons-helper", "~> 2.0"

gem "bootstrap_icons_rubygem", "~> 0.1.0"

gem "quill-editor-rails"

# JavaScript

gem 'execjs' 
