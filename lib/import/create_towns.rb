
require 'rgeo/shapefile'

module Import
  class CreateTowns < Step

    def up
      shapefile do |file|
        file.each do
          increment
        end
      end
    end

    def down
      Town.delete_all
    end

    def count
      shapefile do |file|
        return file.num_records
      end
    end

    def shapefile

      # Build shapefile path.
      path = "#{Rails.root}/data/2010TownshipCensus.shp"

      # Yield the RGeo instance.
      RGeo::Shapefile::Reader.open(path) do |file|
        yield file
      end

    end

  end
end
