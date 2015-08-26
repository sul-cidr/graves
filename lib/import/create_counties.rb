
require 'rgeo/shapefile'

module Import
  class CreateCounties < Step

    def up
      # TODO
    end

    def down
      County.delete_all
    end

    def count
      1
    end

  end
end
