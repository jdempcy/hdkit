class SmartKv
  DirectUsageError = Class.new(StandardError)

  class KeyError < ::KeyError
    attr_reader :key, :receiver

    def initialize(message, key: nil, receiver: {})
      @key = key
      @receiver = receiver
      super(message)
    end
  end
end
