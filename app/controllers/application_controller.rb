
class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :authenticate

  #
  # Basic auth in production.
  #
  def authenticate
    if Rails.env.production?
      authenticate_or_request_with_http_basic do |u, p|
        u == ENV['GRAVES_USER'] && p == ENV['GRAVES_PASS']
      end
    end
  end

end
