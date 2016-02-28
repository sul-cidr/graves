
module API
  class CountiesController < ApplicationController

    def index
      @counties = County.web_geometry.to_geojson(
        :name_p,
        :choropleths,
      )
    end

  end
end
