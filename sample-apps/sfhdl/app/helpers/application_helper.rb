module ApplicationHelper
  def admin?
    request.original_fullpath.start_with?("/admin")
  end

  def bootstrap_flash_messages
    render 'shared/bootstrap_flash_messages'
  end

  def tailwind_flash_messages
    render 'shared/tailwind_flash_messages'
  end
end
