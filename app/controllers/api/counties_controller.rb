
module API
  class CountiesController < ApplicationController

    def index
      render json: County.snap.to_geojson(
        :name_p,
        :choropleths,
      )
    end

  end
end
