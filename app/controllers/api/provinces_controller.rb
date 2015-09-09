
module API
  class ProvincesController < ApplicationController

    def index
      @provinces = Province.all
    end

  end
end
