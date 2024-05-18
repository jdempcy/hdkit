require 'set'
require_relative "errors"
require_relative "helper"

module SmartKv::Core
  include SmartKv::Helper

  def required(*args)
    init_required
    @required += args
    @optional -= @required if @optional
    @required
  end

  def required_keys
    init_required
    @required.to_a
  end

  def init_required
    @required ||= superclass == SmartKv ? ::Set.new : superclass.required.dup
  end

  def optional(*args)
    init_optional
    @optional += args
    @required -= @optional if @required
    @optional
  end

  def optional_keys
    init_optional
    @optional.to_a
  end

  def init_optional
    @optional ||= superclass == SmartKv ? ::Set.new : superclass.optional.dup
  end

  def keys
    init_required; init_optional
    @required + @optional
  end

  def check(kv={})
    prevent_direct_usage

    object_class = callable_class || kv.class
    kv = kv.dup

    unless SmartKv::Helper.production?
      hash = kv.to_h
      missing_keys = required_keys - hash.keys
      unless missing_keys.empty?
        raise SmartKv::KeyError, "missing required key(s): #{missing_keys.map{|k| k.to_sym.inspect }.join(', ')} in #{self.class}"
      end

      unrecognized_keys = hash.keys - keys.to_a
      unless unrecognized_keys.empty?
        key = unrecognized_keys.first
        raise SmartKv::KeyError.new("unrecognized key: #{key.inspect} in #{self}.", key: key, receiver: (keys - hash.keys).map {|k| [k, nil] }.to_h)
      end
    end

    return to_callable_object(object_class, kv)
  end
  alias_method :new, :check

  def callable_as(klass)
    @callable_as = superclass == SmartKv ? klass : superclass.callable_class
  end

  def callable_class
    @callable_as
  end

private

  def prevent_direct_usage
    if self == SmartKv
      raise SmartKv::DirectUsageError, "only subclass of SmartKv is meant to be used".freeze
    end
  end
end
