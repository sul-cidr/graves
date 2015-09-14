
module API
  class CollectionsController < ApplicationController

    def index
      @collections = Collection.as_geojson
    end

  end
end
