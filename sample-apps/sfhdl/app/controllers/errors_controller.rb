class ErrorsController < ApplicationController
  include ApplicationHelper

  layout Proc.new { |controller| admin? ? "admin" : "devise" }

  def show
    render status_code.to_s, status: status_code
  end

  protected

  def status_code
    params[:code] || 500
  end
end

