
module API
  class CollectionsController < ApplicationController

    def index
      @collections = Collection.select_geojson
    end

  end
end
