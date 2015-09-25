
module API
  class CountiesController < ApplicationController

    def index
      @counties = County.snap.to_geojson(
        :name_p,
        :choropleths,
      )
    end

  end
end
