
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    @depends = [CreateProvinces]

    def shapefile

      path = Rails.root.join('data/cdc/counties.shp').to_s

      RGeo::Shapefile::Reader.open(
        path, :factory => Helpers::Geo.factory.projection_factory
      )

    end

    def up

      factory = Helpers::Geo.factory

      shapefile.each do |record|

        # Convert meters -> degrees.
        geometry = factory.unproject(record.geometry)

        # Find the parent province.
        province = Province.find_by(cdc_id: record[:gbcode][0..1])

        County.create!(
          province: province,
          cdc_id: record[:gbcode],
          name_p: record[:ename],
          name_c: record[:chname],
          geometry: geometry,
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
