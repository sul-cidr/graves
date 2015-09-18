
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    @depends = [CreateProvinces]

    def shapefile
      super('cdc/counties/test-4326.shp')
    end

    def up

      shapefile.each do |record|

        # Find the parent province.
        province = Province.find_by(cdc_id: record[:gbcode][0..1])

        County.create!(
          province: province,
          cdc_id: record[:gbcode],
          name_p: record[:ename],
          name_c: record[:chname],
          geometry: record.geometry,
        )

        increment

      end

    end

    def down
      County.delete_all
    end

    def count
      shapefile.num_records
    end

  end
end
