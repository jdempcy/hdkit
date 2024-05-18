# frozen_string_literal: true

# 暂时没用到，先放着
module FlashHelper
  # https://gist.github.com/MyklClason/e157acec1ba5c2041ba16752c93ca2a0
  ALERT_TYPES = [
    :primary,
    :secondary,
    :success,
    :danger,
    :warning,
    :info,
    :light,
    :dark,
  ] unless const_defined?(:ALERT_TYPES)

  def bootstrap_flash_help(options = {})
    flash_messages = []
    flash.each do |type, message|
      # Skip empty messages, e.g. for devise messages set to nothing in a locale file.
      next if message.blank?

      type = type.to_sym
      type = :success if type == :notice
      type = :danger  if type == :alert
      type = :danger  if type == :error
      next unless ALERT_TYPES.include?(type)

      tag_class = options.extract!(:class)[:class]
      tag_options = {
        class: "alert alert-#{type} #{tag_class} alert-dismissible fade show",
        role: "alert"
      }.merge(options)

      close_button = content_tag(:button, "", type: "button", class: "btn-close", "data-bs-dismiss" => "alert")

      Array(message).each do |msg|
        text = content_tag(:div, close_button + msg, tag_options)
        flash_messages << text if msg
      end
    end
    flash_messages.join("\n").html_safe
  end

  # bootstrap 4 pro qiuzhi99 在用
  # def flash_messages(options={})
  #   flash_names = [:success, :warning, :error, :danger, :alert, :notice]
  #   html = ''
  #   flash_names.each do |flash_type|
  #     html += flash_message_for( flash_type, flash[flash_type], options ) if flash[flash_type]
  #   end
  #   raw html
  # end
  #
  # def flash_message_for(flash_type, message, options={})
  #   options = {
  #     :type      => :tip,
  #     :closeable => true,
  #     :timeout   => 2500
  #   }.merge( options );
  #
  #   id = 'flash_' + rand(Time.now.to_i).to_s
  #
  #   flash_class = case flash_type.to_s
  #   when "alert"
  #     'warning'
  #   when 'error'
  #     'danger'
  #   when 'notice'
  #     'info'
  #   else
  #     flash_type.to_s
  #   end
  #
  #   html  = "<div id='#{ id }' class='alert alert-#{flash_class} #{ options[:closeable] ? 'closeable' : '' } #{ options[:type].to_s }'>"
  #   html += '<button type="button" class="close" data-dismiss="alert"></button>' if options[:closeable]
  #   html += "#{ message }"
  #   html += "</div>"
  #
  #   if options[:closeable]
  #     html += "<script type='text/javascript'>"
  #     html += "setTimeout( function(){ $('##{ id }').fadeOut(); }, #{ options[:timeout] } )"
  #     html += "</script>"
  #   end
  #
  #   raw html
  # end
end

