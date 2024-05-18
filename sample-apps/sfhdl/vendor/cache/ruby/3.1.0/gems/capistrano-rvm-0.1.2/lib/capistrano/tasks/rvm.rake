RVM_SYSTEM_PATH = "/usr/local/rvm"
RVM_USER_PATH = "~/.rvm"

namespace :rvm do
  desc "Prints the RVM and Ruby version on the target host"
  task :check do
    on roles(fetch(:rvm_roles, :all)) do
      if fetch(:log_level) == :debug
        puts capture(:rvm, "version")
        puts capture(:rvm, "current")
        puts capture(:ruby, "--version")
      end
    end
  end

  task :hook do
    on roles(fetch(:rvm_roles, :all)) do
      rvm_path = fetch(:rvm_custom_path)
      rvm_path ||= case fetch(:rvm_type)
      when :auto
        if test("[ -d #{RVM_USER_PATH} ]")
          RVM_USER_PATH
        elsif test("[ -d #{RVM_SYSTEM_PATH} ]")
          RVM_SYSTEM_PATH
        else
          RVM_USER_PATH
        end
      when :system, :mixed
        RVM_SYSTEM_PATH
      else # :user
        RVM_USER_PATH
      end

      set :rvm_path, rvm_path
    end

    SSHKit.config.command_map[:rvm] = "#{fetch(:rvm_path)}/bin/rvm"

    rvm_prefix = "#{fetch(:rvm_path)}/bin/rvm #{fetch(:rvm_ruby_version)} do"
    fetch(:rvm_map_bins).each do |command|
      SSHKit.config.command_map.prefix[command.to_sym].unshift(rvm_prefix)
    end
  end
end

Capistrano::DSL.stages.each do |stage|
  after stage, 'rvm:hook'
  after stage, 'rvm:check'
end

namespace :load do
  task :defaults do
    set :rvm_map_bins, %w{gem rake ruby bundle}
    set :rvm_type, :auto
    set :rvm_ruby_version, "default"
  end
end
