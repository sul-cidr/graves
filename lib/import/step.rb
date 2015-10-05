
require 'unicode'

module Import
  class Step < Vacuum::Step

    #
    # Open a CSV in the /data directory.
    #
    # @param file [String]
    #
    def csv(file)
      CSV.open(
        Rails.root.join("data/#{file}"),
        :headers => true,
        :header_converters => :symbol
      )
    end

    #
    # Open a shapefile in the /data directory.
    #
    # @param file [String]
    #
    def shapefile(file)
      path = Rails.root.join("data/#{file}").to_s
      RGeo::Shapefile::Reader.open(path, srid: 4326)
    end

    #
    # Cast a geometry to EPSG:4326.
    #
    # @param geometry [RGeo::Geos]
    #
    def to_4326(geometry)
      RGeo::Feature.cast(
        geometry,
        factory: Helpers::Geo.factory,
        project: true,
      )
    end

  end
end
