
module Import
  class CreateCollections < Step

    def up
      # TODO
    end

    def down
      Collection.delete_all
    end

  end
end
