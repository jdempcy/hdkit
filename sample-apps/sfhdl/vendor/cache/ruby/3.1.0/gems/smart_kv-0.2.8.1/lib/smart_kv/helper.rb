module SmartKv::Helper
  def to_callable_object(object_class, kv)
    if object_class == Struct
      Struct.new(*kv.to_h.keys).new(*kv.to_h.values)
    elsif object_class < Struct
      object_class.new(*kv.to_h.values)
    elsif object_class <= Hash
      kv.to_h
    else
      object_class.new(kv.to_h)
    end
  end

  module_function

  def has_did_you_mean_key_error?
    defined?(DidYouMean::KeyErrorChecker)
  end

  def production?
    (ENV['RAILS_ENV'] || ENV['RACK_ENV']) == "production"
  end
end
