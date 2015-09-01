
require 'unicode'

module Import
  class Step < Vacuum::Step

    #
    # Connect to the legacy database.
    #
    # @return [Sequel::Database]
    #
    def self.DB

      # Read legacy params from Rails config.
      params = Rails.configuration.database_configuration["legacy"]

      Sequel.connect(
        :adapter => "postgres",
        **params.symbolize_keys
      )

    end

    #
    # Cache a database connection.
    #
    def initialize
      @DB = self.class.DB
      super
    end

    #
    # Open a shapefile in the /data directory.
    #
    # @param file [String]
    #
    def shapefile(file)

      # Build shapefile path.
      path = "#{Rails.root}/data/#{file}"

      # Yield the RGeo instance.
      RGeo::Shapefile::Reader.open(path) do |shp|
        yield shp
      end

    end

  end
end
