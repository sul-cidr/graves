
module Import
  class CreateTowns < Step

    def up
      # TODO
    end

    def down
      Town.delete_all
    end

    def count
      1
    end

  end
end
