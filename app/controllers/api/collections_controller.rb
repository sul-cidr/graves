
module API
  class CollectionsController < ApplicationController

    def index
      render json: Collection.snap.to_geojson(
        :province_p,
        :county_p,
        :town_p,
        :num_graves,
      )
    end

  end
end
