module SSHKit
  module Interactive
    class Command
      attr_reader :host, :remote_command

      # Instantiate new interactive SSHKit command wrapper.
      #
      # @param host [SSHKit::Host] the host to run `remote_command` on.
      # @param remote_command [SSHKit::Command] the command to run on `host`.
      def initialize(host, remote_command = nil, options = {})
        @host           = host
        @remote_command = remote_command
        @options        = options
      end

      # Run the command on the remote host via SSH binary.
      def execute
        system(to_s)
      end

      # SSH command arguments
      def ssh_cmd_args
        args = []

        args << '-t'
        args << '-A' if forward_agent?
        args << "-p #{port}" if port
        args << "-l #{user}" if user
        args << %Q{-o "PreferredAuthentications #{auth_methods.join(',')}"} if auth_methods.count > 0
        args << %Q{-o "ProxyCommand #{proxy_command}"} if proxy
        args << %Q{-o "HostName #{host_name}"} if host_name

        keys.each do |key|
          args << "-i #{key}"
        end

        args
      end

      # Complete command
      def to_s
        [
          :ssh,
          *ssh_cmd_args,
          host.hostname,
          command
        ].reject(&:empty?).join(' ')
      end

      private

      # available options: http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start
      def netssh_options
        host.netssh_options
      end

      def user
        host.user
      end

      def port
        netssh_options[:port]
      end

      def forward_agent?
        !!netssh_options[:forward_agent]
      end

      def host_name
        netssh_options[:host_name]
      end

      def keys
        Array(netssh_options[:keys])
      end

      def auth_methods
        Array(netssh_options[:auth_methods])
      end

      def proxy
        netssh_options[:proxy]
      end

      def proxy_command
        proxy.command_line_template
      end

      def command
        cmd   = remote_command.to_command.gsub("'", "\\\"") # replace single quotes with double quotes
        shell = @options[:shell] || '$SHELL'

        %Q{'#{shell} -l -c \"#{cmd}\"'}
      end
    end
  end
end
