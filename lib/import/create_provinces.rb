
require 'rgeo/shapefile'

module Import
  class CreateProvinces < Step

    def up
      shapefile('2010ProvL.shp') do |file|
        file.each do |record|
          increment
        end
      end
    end

    def down
      Province.delete_all
    end

    def count
      shapefile('2010ProvL.shp') do |file|
        return file.num_records
      end
    end

  end
end
