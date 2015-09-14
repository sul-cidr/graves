
module API
  class ProvincesController < ApplicationController

    def index
      @provinces = Province.as_geojson
    end

  end
end
