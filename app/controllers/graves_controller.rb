
class GravesController < ApplicationController

  def index
    @pages = Narrative.where(:hidden => true)
    @narratives = Narrative.where(:hidden => false).order{ pub_date.asc }
  end

  def read
    @pages = Narrative.where(:hidden => true)
    @narrative = Narrative.where(:hidden => false).find_by(slug: params[:slug])
  end

  def pages
    @pages = Narrative.where(:hidden => true)
    @page = Narrative.where(:hidden => true).find_by(slug: params[:slug])
  end

end
