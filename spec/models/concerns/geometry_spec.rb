
require 'rails_helper'

describe Geometry do

  with_model :GeoModel do

    table do |t|
      t.string :field1
      t.string :field2
      t.string :field3
      t.geometry :geometry, srid: 4326
    end

    model do
      include Geometry
    end

  end

  describe ':with_geojson' do

    it 'selects `geometry` as GeoJSON' do

      GeoModel.create!(geometry: Helpers::Geo.point(1, 2))

      # Get first record, parse JSON.
      geojson = MultiJson.load(GeoModel.with_geojson.first.geojson)
      pp geojson

    end

    it 'limits coordinate digits'

  end

end
