
module API
  class ProvincesController < ApplicationController

    def index
      @provinces = Province.snap
    end

  end
end
