
require 'rgeo/shapefile'

module Import
  class CreateTowns < Step

    def up
      shapefile('2010TownshipCensus.shp') do |file|
        file.each do |record|

          Town.create(
            cdc_id: record['GBTownship'],
            name_p: record['TownshipEN'],
            name_c: record['TownshipCH'],
            lonlat: record.geometry,
          )

          increment

        end
      end
    end

    def down
      Town.delete_all
    end

    def count
      shapefile('2010TownshipCensus.shp') do |file|
        return file.num_records
      end
    end

  end
end
