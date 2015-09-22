
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

    it 'selects `geojson` (with flipped coordinates)' do

      GeoModel.create!(
        geometry: Helpers::Geo.point(1, 2)
      )

      geojson = MultiJson.load(GeoModel.with_geojson.first.geojson)

      expect(geojson).to eq(
        'type' => 'Point',
        'coordinates' => [2, 1],
      )

    end

    it 'rounds coordinate decimals' do

      GeoModel.create!(
        geometry: Helpers::Geo.point(1.12345, 2.12345)
      )

      geojson = MultiJson.load(GeoModel.with_geojson.first.geojson)

      # Round to 2 by default.
      expect(geojson).to eq(
        'type' => 'Point',
        'coordinates' => [2.12, 1.12],
      )

    end

  end

end
