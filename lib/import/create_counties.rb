
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    def up

      type = PlaceType.county

      paths.each do |p|
        RGeo::Shapefile::Reader.open(p) do |file|
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

      #shapefile do |file|
        #file.each do |record|

          #Place.create!(
            #place_type: type,
            #cdc_id: record[:gbcode],
            #name_p: record[:ename],
            #name_c: record[:chname],
            #geometry: record.geometry,
          #)

          #increment

        #end
      #end

    end

    def down
      #Place.counties.delete_all
    end

    def count
      paths.size
    end

    def paths
      Dir.glob("#{Rails.root}/data/counties/shpExport*/export.shp")
    end

  end
end
