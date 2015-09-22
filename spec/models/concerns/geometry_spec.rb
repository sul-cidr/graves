
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

end
