
module Geometry

  extend ActiveSupport::Concern

  included do

    #
    # Select geometry as GeoJSON.
    #
    scope :as_geojson, -> (digits=2) {
      select {
        my{column_names} -
        ['geometry'] +
        [ST_AsGeoJSON(ST_FlipCoordinates(geometry), digits).as(geojson)]
      }
    }

  end

end
