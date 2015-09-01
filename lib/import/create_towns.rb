
require 'rgeo/shapefile'

module Import
  class CreateTowns < Step

    def shapefile
      super('towns.shp')
    end

    def up

      type = PlaceType.town

      shapefile do |file|
        file.each do |record|

          Place.create!(
            place_type: type,
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
      Place.towns.delete_all
    end

    def count
      shapefile do |file|
        return file.num_records
      end
    end

  end
end
