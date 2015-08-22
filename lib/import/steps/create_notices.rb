
module Import
  class CreateNotices < Step

    def up
      # TODO
    end

    def down
      Notice.delete_all
    end

  end
end
