
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    def shapefile
      super('counties_cdc_3857.shp')
    end

    def up

      type = PlaceType.county

      shapefile do |file|
        file.each do |record|

          Place.create!(
            place_type: type,
            cdc_id: record[:gbcode],
            name_p: record[:ename],
            name_c: record[:chname],
            geometry: record.geometry,
          )

          increment

        end
      end
    end

    def down
      Place.by_type('county').delete_all
    end

    def count
      shapefile do |file|
        return file.num_records
      end
    end

  end
end
