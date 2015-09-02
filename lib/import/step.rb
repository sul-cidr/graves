
require 'unicode'

module Import
  class Step < Vacuum::Step

    #
    # Cache a database connection.
    #
    def initialize
      super
      @DB = self.class.DB
    end

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
    # Open a shapefile in the /data directory.
    #
    # @param file [String]
    #
    def shapefile(file)
      path = "#{Rails.root}/data/#{file}"
      RGeo::Shapefile::Reader.open(path)
    end

  end
end
