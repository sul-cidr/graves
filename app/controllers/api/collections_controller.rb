
module API
  class CollectionsController < ApplicationController

    def index
      @collections = Collection.with_geojson
    end

  end
end
