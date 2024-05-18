module SSHKit
  module Interactive
    class Backend < SSHKit::Backend::Printer
      def initialize(host, options = {}, &block)
        super(host, &block)

        @options = options
      end

      def run
        instance_exec(host, &@block)
      end

      def within(directory, &_block)
        (@pwd ||= []).push(directory.to_s)

        yield
      ensure
        @pwd.pop
      end

      def as(who, &_block)
        if who.is_a?(Hash)
          @user  = who[:user]  || who['user']
          @group = who[:group] || who['group']
        else
          @user  = who
          @group = nil
        end

        raise SSHKit::Interactive::Unsupported, 'Setting group (through `as`) is currently not supported' unless @group.nil?

        yield
      ensure
        remove_instance_variable(:@user)
        remove_instance_variable(:@group)
      end

      def execute(*args)
        super

        options = args.extract_options!
        cmd     = Command.new(host, command(args, options), @options)

        debug(cmd.to_s)

        cmd.execute
      end

      def _unsupported_operation(*args)
        raise SSHKit::Backend::MethodUnavailableError, 'SSHKit::Interactive does not support this operation.'
      end

      alias :upload! :_unsupported_operation
      alias :download! :_unsupported_operation
      alias :test :_unsupported_operation
      alias :capture :_unsupported_operation
    end
  end
end
