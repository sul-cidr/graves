
module API
  class ProvincesController < ApplicationController

    def index
      @provinces = Province.select_geojson
    end

  end
end
