
class GravesController < ApplicationController

  def index
  end

  def read
    @narrative = Narrative.find_by(slug: params[:slug])
  end

end
