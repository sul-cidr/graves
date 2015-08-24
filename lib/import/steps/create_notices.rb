
module Import
  class CreateNotices < Step

    def up
      @DB[:master_20150601].distinct(:nid).each do |n|

        pub_date = Date.strptime(n[:pub_date].to_s, '%m/%d/%Y') rescue nil

        Notice.create(
          pub_date: pub_date,
        )

      end
    end

    def down
      Notice.delete_all
    end

  end
end
