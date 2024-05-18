require "bootstrap_icons/version"
require "bootstrap_icons/bootstrap_icon"
require "json"

module BootstrapIcons
  file_data = File.read(File.join(File.dirname(__FILE__), "build/data.json"))
  BOOTSTRAP_ICONS_SYMBOLS = JSON.parse(file_data).freeze
end
