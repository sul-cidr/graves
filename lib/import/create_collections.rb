
module Import
  class CreateCollections < Step

    def up
      @DB[:master_20150601].distinct(:rid).each do |r|

        notice = Notice.find_by(legacy_id: r[:nid])

        Collection.create(
          notice: notice
        )

      end
    end

    def down
      Collection.delete_all
    end

  end
end
