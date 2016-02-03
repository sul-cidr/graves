
class GravesController < ApplicationController

  def index
    @narratives = Narrative.all
  end

  def read
    @narrative = Narrative.find_by(slug: params[:slug])
  end

end
