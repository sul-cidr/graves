
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
    # TODO
  end

  describe '.to_geojson()' do
    # TODO
  end

end
