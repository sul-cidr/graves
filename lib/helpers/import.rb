
module Helpers
  module Import

    #
    # Connect to the legacy database.
    #
    # returns [Sequel::Database]
    #
    def legacy_db

      # Read legacy params from Rails config.
      params = Rails.configuration.database_configuration["legacy"]

      Sequel.connect(
        :adapter => "postgres",
        **params.symbolize_keys
      )

    end

  end
end
