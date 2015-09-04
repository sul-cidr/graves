
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    @depends = [CreateProvinces]

    def up

      factory = RGeo::Geographic.simple_mercator_factory()

      paths.each do |path|
        RGeo::Shapefile::Reader.open(
          path,
          :factory => factory.projection_factory
        ) do |file|

          file.each do |record|

            # Convert meters -> degrees.
            geometry = factory.unproject(record.geometry)

            County.create!(
              cdc_id: record[:gbcode],
              name_p: decode(record[:ename]),
              name_c: decode(record[:chname]),
              geometry: geometry,
            )

          end

          increment

        end
      end

    end

    def down
      County.delete_all
    end

    def count
      paths.size
    end

    #
    # Glob the county shapefile paths.
    #
    # @return [Array]
    #
    def paths
      Dir.glob("#{Rails.root}/data/cdc/counties/*/export.shp")
    end

    #
    # Convert GB18030 -> UTF8.
    #
    # @param value [String]
    # @return [String]
    #
    def decode(value)
      value.force_encoding('GB18030').encode('utf-8')
    end

  end
end
