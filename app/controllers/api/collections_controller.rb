
module API
  class CollectionsController < ApplicationController

    def index
      @collections = Collection.includes(:notice).snap.to_geojson(
        :num_graves,
        :location,
        :destination,
        :province_p,
        :province_c,
        :county_p,
        :county_c,
        :town_p,
        :town_c,
        :notice,
      )
    end

  end
end
