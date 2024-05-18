require 'sshkit'

require_relative 'interactive/version'
require_relative 'interactive/command'
require_relative 'interactive/backend'
require_relative 'interactive/dsl'

module SSHKit
  module Interactive
    Unsupported = Class.new(SSHKit::StandardError)
  end
end
