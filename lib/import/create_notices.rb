
module Import
  class CreateNotices < Step

    def up
      @DB[:master_20150601].distinct(:nid).each do |n|

        Notice.create(
          legacy_id:      n[:nid],
          pub_date:       self.parse_date(n[:pub_date]),
          notice_date:    self.parse_date(n[:notification_date]),
          deadline:       self.parse_date(n[:deadline]),
          url:            self.clean(n[:url]),
          site_p:         self.clean(n[:site_p]),
          site_c:         self.clean(n[:site_c]),
          title_p:        self.clean(n[:title_p]),
          title_c:        self.clean(n[:title_c]),
          org_p:          self.clean(n[:org_p]),
          org_c:          self.clean(n[:org_c]),
          contact_phone:  self.clean(n[:contact_phone]),
          contact_p:      self.clean(n[:contact_p]),
          contact_c:      self.clean(n[:contact_c]),
        )

        increment

      end
    end

    def down
      Notice.delete_all
    end

    def count
      @DB[:master_20150601].distinct(:nid).count()
    end

    #
    # Parse a mm/dd/yyy date.
    #
    # @param string [String]
    # @return [Date]
    #
    def self.parse_date(string)
      Date.strptime(string.to_s, '%m/%d/%Y') rescue nil
    end

    #
    # "Empty" strings to nil, flatten Chinese digits.
    #
    # @param value [String]
    # @return [Mixed]
    #
    def self.clean(value)

      # Empty strings to nil.
      if ['', 'N/A'].include?(value)
        value = nil

      # Normalize Chinese digits.
      elsif value.is_a?(String)
        value = Unicode.normalize_KC(value)
      end

      value

    end

  end
end
