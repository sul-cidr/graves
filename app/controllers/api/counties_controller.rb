
module API
  class CountiesController < ApplicationController

    def index

      @counties = County
        .web_geometry
        .as_geojson(
          :name_p,
          :choropleths,
        )

    end

  end
end
