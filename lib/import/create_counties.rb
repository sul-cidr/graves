
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    @depends = [CreateProvinces]

    def shapefile
      super('counties_cdc_3857.shp')
    end

    def up
      shapefile do |file|
        file.each do |record|

          County.create(
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
      County.delete_all
    end

    def count
      shapefile do |file|
        return file.num_records
      end
    end

  end
end
