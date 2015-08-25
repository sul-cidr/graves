
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

  end
end
