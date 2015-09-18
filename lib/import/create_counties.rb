
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    @depends = [CreateProvinces]

    def shapefile
      super('cdc/counties/counties.shp')
    end

    def up

      factory = Helpers::Geo.factory

      path = Rails.root.join('data/cdc/counties/counties.shp')

      RGeo::Shapefile::Reader.open(
        path.to_s, :factory => factory.projection_factory
      ) do |file|

        file.each do |record|

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

    end

    def down
      County.delete_all
    end

    def count
      shapefile.num_records
    end

  end
end
