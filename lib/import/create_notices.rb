
module Import
  class CreateNotices < Step

    def up
      csv('google.csv').each do |n|

        # Ignore duplicate rows.
        if Notice.exists?(legacy_id: n[:nid])
          next
        end

        Notice.create(
          legacy_id:      n[:nid],
          pub_date:       parse_date(n[:pub_date]),
          notice_date:    parse_date(n[:notification_date]),
          deadline:       parse_date(n[:deadline]),
          url:            clean(n[:url]),
          site_p:         clean(n[:site_p]),
          site_c:         clean(n[:site_c]),
          title_p:        clean(n[:title_p]),
          title_c:        clean(n[:title_c]),
          org_p:          clean(n[:org_p]),
          org_c:          clean(n[:org_c]),
          contact_phone:  clean(n[:contact_phone]),
          contact_p:      clean(n[:contact_p]),
          contact_c:      clean(n[:contact_c]),
        )

      end
    end

    def down
      Notice.delete_all
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
    # "Empty" strings to nil, flatten Chinese digits.
    #
    # @param value [String]
    # @return [Mixed]
    #
    def clean(value)

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
