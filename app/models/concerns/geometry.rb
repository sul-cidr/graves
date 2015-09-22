
module Geometry

  extend ActiveSupport::Concern

  included do

    #
    # Select geometry as (simplified) GeoJSON.
    #
    scope :with_geojson, -> (digits=2) {
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
          json.array! with_geojson do |r|

            if not r.geojson
              next
            end

            json.type 'Feature'
            json.id r.id
            json.geometry r.geojson

          end
        end

      end
    end

  end

  #
  # Parse GeoJSON from Postgres.
  #
  # @return [String]
  #
  def geojson
    MultiJson.load(read_attribute(:geojson))
  end

end
