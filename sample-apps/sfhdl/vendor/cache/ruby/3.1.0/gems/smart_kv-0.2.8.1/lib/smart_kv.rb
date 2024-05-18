require_relative "smart_kv/version"
require_relative "smart_kv/helper"
require_relative "smart_kv/core"

class SmartKv
  if Helper.has_did_you_mean_key_error?
    require_relative "smart_kv/did_you_mean"
  end

  extend Core
end
