
module Import
  class CreateNotices < Step

    def up
      @DB[:master_20150601].distinct(:nid).each do |n|

        Notice.create(
          pub_date: parse_date(n[:pub_date])
        )

      end
    end

    def down
      Notice.delete_all
    end

  end
end
