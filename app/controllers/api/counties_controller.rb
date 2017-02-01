
module API
  class CountiesController < ApplicationController

    def index
      @counties = County.as_geojson(:name_p, :choropleths)
    end

  end
end
