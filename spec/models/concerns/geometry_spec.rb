
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

      expect(GeoModel.with_geojson.first.geojson).to eq(
        'type' => 'Point',
        'coordinates' => [2, 1],
      )

    end

    it 'rounds coordinate decimals' do

      GeoModel.create!(
        geometry: Helpers::Geo.point(1.12345, 2.12345)
      )

      # Round to 4 digits.
      expect(GeoModel.with_geojson(4).first.geojson).to include(
        'coordinates' => [2.1235, 1.1235]
      )

      # Round to 2 by default.
      expect(GeoModel.with_geojson.first.geojson).to include(
        'coordinates' => [2.12, 1.12]
      )

    end

  end

end
