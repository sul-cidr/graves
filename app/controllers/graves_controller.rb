
class GravesController < ApplicationController

  def index
    @pages = Narrative.pages
    @narratives = Narrative.where(:hidden => false).order{ pub_date.asc }
  end

  def read
    @pages = Narrative.pages
    @narrative = Narrative.where(:hidden => false).find_by(slug: params[:slug])
  end

  def pages
    @pages = Narrative.pages
    @page = Narrative.where(:hidden => true).find_by(slug: params[:slug])
  end

end
