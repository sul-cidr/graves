
require 'rgeo/shapefile'

module Import
  class CreateTowns < Step

    @depends = [CreateCounties]

    def shapefile
      super('2010TownshipCensus.shp')
    end

    def up
      shapefile do |file|
        file.each do |record|

          Town.create(
            cdc_id: record['GBTownship'],
            name_p: record['TownshipEN'],
            name_c: record['TownshipCH'],
            geometry: record.geometry,
          )

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

  end
end
