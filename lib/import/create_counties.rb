
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    def up

      type = PlaceType.county

      factory = RGeo::Geographic.projected_factory(
        :projection_proj4 => [
          '+proj=merc',
          '+lon_0=0',
          '+k=1',
          '+x_0=0',
          '+y_0=0',
          '+datum=WGS84',
          '+units=m',
          '+no_defs',
        ].join(' ')
      )

      proj = factory.projection_factory

      paths.each do |path|
        RGeo::Shapefile::Reader.open(path, :factory => proj) do |file|

          file.each do |record|

            Place.create!(
              place_type: type,
              cdc_id: record[:gbcode],
              name_p: decode(record[:ename]),
              name_c: decode(record[:chname]),
              geometry: factory.unproject(record.geometry),
            )

          end

          increment

        end
      end

    end

    def down
      Place.counties.delete_all
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
      Dir.glob("#{Rails.root}/data/counties/shpExport*/export.shp")
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
