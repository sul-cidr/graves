
module Geometry

  extend ActiveSupport::Concern

  included do

    #
    # Select geometry as (simplified) GeoJSON.
    #
    scope :snap, -> {
      select {
        my{column_names} +
        [ST_SnapToGrid(ST_FlipCoordinates(geometry), 0.001).as(geometry)]
      }
    }

  end

  module ClassMethods

    #
    # Render the collection as GeoJSON.
    #
    # @param keys [Array<Symbol>]
    # @return [Hash]
    #
    def to_geojson(*keys)

      factory = RGeo::GeoJSON::EntityFactory.instance

      features = all.map do |r|
        if r.geometry
          factory.feature(r.geometry, r.id, r.slice(*keys))
        end
      end

      collection = factory.feature_collection(features.compact)
      RGeo::GeoJSON.encode(collection)

    end

  end

end
