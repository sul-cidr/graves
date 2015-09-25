
module API
  class NarrativesController < ApplicationController

    def show
      render json: Narrative.find_by(slug: params[:id])
    end

  end
end
