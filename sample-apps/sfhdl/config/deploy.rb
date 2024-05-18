# config valid for current version and patch releases of Capistrano
require 'dotenv/load'
lock "~> 3.16.0"

set :application, ENV["application"]
set :deploy_to, "/home/deploy/#{fetch(:application)}"
set :repo_url, ENV["git_repo_url"]
set :branch, 'main'
append :linked_files, "config/master.key", ".env"
append :linked_dirs, "log", "storage", "tmp/storage", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", 'public/shared', 'public/packs'

set :rvm_ruby_version, 'ruby-3.0.0'
set :puma_init_active_record, true
set :puma_phased_restart, true

set :nginx_server_name, ENV["domain"]

set :puma_service_unit_name, fetch(:application)
set :sidekiq_service_unit_user, :system
set :sidekiq_service_unit_name, "#{fetch(:application)}-sidekiq"

SSHKit.config.command_map[:sidekiq] = "bundle exec sidekiq"
SSHKit.config.command_map[:sidekiqctl] = "bundle exec sidekiqctl"

set :nginx_use_ssl, ENV["nginx_use_ssl"] == "true"
set :nginx_ssl_certificate, ENV["nginx_ssl_certificate"]
set :nginx_ssl_certificate_key, ENV["nginx_ssl_certificate_key"]
set :nginx_ssl_dhparam, ENV["nginx_ssl_dhparam"]


set :bundle_flags, ''

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  # after :restart, :clear_cache do
  #   on roles(:web), in: :groups, limit: 3, wait: 10 do
  #     # Here we can do anything such as:
  #     # within release_path do
  #     #   execute :rake, 'cache:clear'
  #     # end
  #   end
  # end
  #
  # task :restart do
  # end

  namespace :check do
    before :linked_files, :set_master_key do
      on roles(:app), in: :sequence, wait: 10 do
        unless test("[ -f #{shared_path}/config/master.key ]")
          upload! 'config/master.key', "#{shared_path}/config/master.key"
        end
      end
    end
    before :linked_files, :set_env_file do
      on roles(:app), in: :sequence, wait: 10 do
        unless test("[ -f #{shared_path}/.env ]")
          upload! '.env', "#{shared_path}/.env"
        end
      end
    end
  end
end

namespace :logs do
  desc "tail rails logs"
  task :tail_rails do
    on roles(:app) do
      execute "tail -f #{shared_path}/log/#{fetch(:rails_env)}.log"
    end
  end
end

# task :restart_sidekiq do
#   on roles(:worker) do
#     execute :service, "sidekiq restart"
#   end
# end
# after "deploy:published", "restart_sidekiq"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
