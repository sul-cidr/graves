
module Geometry

  extend ActiveSupport::Concern

  included do

    #
    # Select geometry as (simplified) GeoJSON.
    #
    scope :select_geojson, -> (digits=2) {
      select {
        my{column_names} +
        [ST_AsGeoJSON(ST_FlipCoordinates(geometry), digits).as(geojson)]
      }
    }

  end

  module ClassMethods

    #
    # Render the collection as GeoJSON.
    #
    # @return [Hash]
    #
    def to_geojson
      Jbuilder.new do |json|

        json.type 'FeatureCollection'

        json.features do
          json.array! select_geojson do |r|

            if not r.geojson
              next
            end

            json.type 'Feature'
            json.id r.id
            json.geometry MultiJson.load(r.geojson)

          end
        end

      end
    end

  end

end
