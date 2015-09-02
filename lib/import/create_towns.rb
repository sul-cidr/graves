
module Import
  class CreateTowns < Step

    def up

      type = PlaceType.town

      @DB[:towns_2000].each do |t|

        Place.create!(
          place_type: type,
          cdc_id: t[:gbtown],
          name_p: t[:ename],
          name_c: t[:cname],
          geometry: t[:geom],
        )

        increment

      end

    end

    def down
      Place.towns.delete_all
    end

    def count
      @DB[:towns_2000].count
    end

  end
end
