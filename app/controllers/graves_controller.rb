
class GravesController < ApplicationController

  def index
    @narratives = Narrative.all.order{ pub_date.asc }
  end

  def read
    @narrative = Narrative.find_by(slug: params[:slug])
  end

end
