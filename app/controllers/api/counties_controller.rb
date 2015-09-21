
module API
  class CountiesController < ApplicationController

    def index
      render json: County.to_geojson.target!
    end

  end
end
