
module API
  class CountiesController < ApplicationController

    def index
      @counties = County.as_geojson
    end

  end
end
