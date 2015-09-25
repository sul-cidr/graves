
module API
  class NarrativesController < ApplicationController

    def show
      @narrative = Narrative.find_by(slug: params[:id])
    end

  end
end
