
require 'rgeo/shapefile'

module Import
  class CreateProvinces < Step

    def shapefile
      super('2010ProvL.shp')
    end

    def up
      shapefile do |file|
        file.each do |record|

          Province.create(
            cdc_id: record['GbProv'],
            name_p: record['ProvEN'],
            name_c: record['ProvCH'],
            geometry: record.geometry,
          )

          increment

        end
      end
    end

    def down
      Province.delete_all
    end

    def count
      shapefile do |file|
        return file.num_records
      end
    end

  end
end