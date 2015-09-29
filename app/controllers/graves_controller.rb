class GravesController < ApplicationController

  http_basic_authenticate_with(
    name: ENV['GRAVES_USERNAME'],
    password: ENV['GRAVES_PASSWORD'],
  )

  def index
  end

end
