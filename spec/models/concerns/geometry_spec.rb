
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

  describe '.as_geojson' do

    it 'returns the query as GeoJSON' do

      m1 = GeoModel.create!(geometry: Helpers::Geo.point(1, 2))
      m2 = GeoModel.create!(geometry: Helpers::Geo.point(3, 4))
      m3 = GeoModel.create!(geometry: Helpers::Geo.point(5, 6))

      json = GeoModel.as_geojson.deep_symbolize_keys

      expect(json).to include(type: 'FeatureCollection')

      expect(json[:features][0]).to include(
        type: 'Feature',
        id: m1.id,
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        }
      )

      expect(json[:features][1]).to include(
        type: 'Feature',
        id: m2.id,
        geometry: {
          type: 'Point',
          coordinates: [4, 3]
        }
      )

      expect(json[:features][2]).to include(
        type: 'Feature',
        id: m3.id,
        geometry: {
          type: 'Point',
          coordinates: [6, 5]
        }
      )

    end

    it 'populates "properties" with passed columns' do

      GeoModel.create!(
        field1: 'f11',
        field2: 'f12',
        field3: 'f13',
        geometry: Helpers::Geo.point(1, 2)
      )

      GeoModel.create!(
        field1: 'f21',
        field2: 'f22',
        field3: 'f23',
        geometry: Helpers::Geo.point(3, 4)
      )

      GeoModel.create!(
        field1: 'f31',
        field2: 'f32',
        field3: 'f33',
        geometry: Helpers::Geo.point(5, 6)
      )

      # Request `field1` and `field2`.
      json = GeoModel.as_geojson(:field1, :field2).deep_symbolize_keys

      expect(json[:features][0][:properties]).to include(
        field1: 'f11',
        field2: 'f12',
      )

      expect(json[:features][1][:properties]).to include(
        field1: 'f21',
        field2: 'f22',
      )

      expect(json[:features][2][:properties]).to include(
        field1: 'f31',
        field2: 'f32',
      )

    end

  end

end
