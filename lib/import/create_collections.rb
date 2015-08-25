
module Import
  class CreateCollections < Step

    @depends = [CreateNotices]

    def up
      @DB[:master_20150601].distinct(:rid).each do |r|

        # Find parent notice.
        notice = Notice.find_by(legacy_id: r[:nid])

        Collection.create(
          notice: notice
        )

        increment

      end
    end

    def down
      Collection.delete_all
    end

    def count
      @DB[:master_20150601].distinct(:rid).count()
    end

  end
end
