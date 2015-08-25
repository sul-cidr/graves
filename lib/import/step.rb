
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
    # Parse a mm/dd/yyy date.
    #
    # @param string [String]
    # @return [Date]
    #
    def parse_date(string)
      Date.strptime(string.to_s, '%m/%d/%Y') rescue nil
    end

    #
    # Convert empty strings and "N/A" to nil.
    #
    # @param string [String]
    # @return [String|nil]
    #
    def clean(value)
      ['', 'N/A'].include?(value) ? nil : value;
    end

  end
end
