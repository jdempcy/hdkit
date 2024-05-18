class Admin::PagesController < AdminController
  layout "devise", only: [:register, :login, :error]
  def profile
  end

  def faq
  end

  def contact
  end

  def register
  end

  def login
  end

  def error
  end

  def blank
  end
end
