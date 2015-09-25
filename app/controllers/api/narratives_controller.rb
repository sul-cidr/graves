
module API
  class NarrativesController < ApplicationController

    def show
      render json: Narrative.find_by(id: params[:id])
    end

  end
end
