
class GravesController < ApplicationController

  http_basic_authenticate_with(
    name: ENV['GRAVES_USER'],
    password: ENV['GRAVES_PASS'],
  )

  def index
  end

end
