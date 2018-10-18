
module API
  class NarrativesController < ApplicationController

    def show
      @narrative = Narrative.where(:hidden => false).find_by(slug: params[:id])
    end

  end
end
