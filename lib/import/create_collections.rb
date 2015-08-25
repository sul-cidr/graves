
module Import
  class CreateCollections < Step

    def up
      @DB[:master_20150601].distinct(:rid).each do |r|
        # TODO
      end
    end

    def down
      Collection.delete_all
    end

  end
end
