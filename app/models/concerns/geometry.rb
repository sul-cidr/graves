
module Geometry

  extend ActiveSupport::Concern

  included do

    #
    # Round down point decimals, swap to lat/lon order.
    #
    scope :web_geometry, -> {
      select {[
        "#{my{table_name}}.*",
        ST_SnapToGrid(ST_FlipCoordinates(geometry), 0.001).as(geometry),
      ]}
    }

    #
    # Encode as GeoJSON.
    #
    scope :as_geojson, -> (*keys) {

      factory = RGeo::GeoJSON::EntityFactory.instance

      features = web_geometry.map do |r|
        if r.geometry
          factory.feature(r.geometry, r.id, r.slice(*keys))
        end
      end

      collection = factory.feature_collection(features.compact)

      RGeo::GeoJSON.encode(collection)

    }

  end

end
