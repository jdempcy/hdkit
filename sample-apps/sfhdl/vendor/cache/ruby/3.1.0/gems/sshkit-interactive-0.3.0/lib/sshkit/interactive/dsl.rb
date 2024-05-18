module SSHKit
  module Interactive
    module DSL
      # run commands interactively
      def run_interactively(host, options = {}, &block)
        # Force setting global netssh_options on host if using capistrano
        SSHKit.config.backend.new(host) { test(:true) }.run

        Thread.current[:run_interactively] = true

        SSHKit::Interactive::Backend.new(host, options, &block).run
      ensure
        Thread.current[:run_interactively] = false
      end

      def on(*args)
        raise SSHKit::Interactive::Unsupported, 'Switching host in interactive mode is not possible' if Thread.current[:run_interactively]

        super
      end
    end
  end
end

include SSHKit::Interactive::DSL
