
module Import
  class CreateNotices < Step

    def up
      @DB[:master_20150601].distinct(:nid).each do |n|

        Notice.create(
          pub_date: parse_date(n[:pub_date]),
          notice_date: parse_date(n[:notification_date]),
          deadline: parse_date(n[:deadline]),
          url: n[:url],
        )

      end
    end

    def down
      Notice.delete_all
    end

    def parse_date(string)
      Date.strptime(string.to_s, '%m/%d/%Y') rescue nil
    end

  end
end
