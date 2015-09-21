
module API
  class ProvincesController < ApplicationController

    def index
      @provinces = Province.with_geojson
    end

  end
end
