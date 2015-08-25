
require 'rgeo/shapefile'

module Import
  class CreateTowns < Step

    def up

      path = "#{Rails.root}/data/2010TownshipCensus.shp"

      RGeo::Shapefile::Reader.open(path) do |file|
        puts file.num_records
      end

    end

    def down
      Town.delete_all
    end

    def count
      1
    end

  end
end
