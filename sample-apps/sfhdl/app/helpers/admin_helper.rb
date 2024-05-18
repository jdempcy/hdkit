module AdminHelper
  def components?
    request.original_fullpath.start_with?("/admin/components")
  end

  def forms?
    request.original_fullpath.start_with?("/admin/forms")
  end

  def tables?
    request.original_fullpath.start_with?("/admin/tables")
  end

  def charts?
    request.original_fullpath.start_with?("/admin/charts")
  end

  def icons?
    request.original_fullpath.start_with?("/admin/icons")
  end
end
