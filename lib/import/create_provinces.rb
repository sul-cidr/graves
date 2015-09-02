
module Import
  class CreateProvinces < Step

    def up

      type = PlaceType.province

      @DB[:province_cdc_4326].each do |p|

        Place.create!(
          place_type: type,
          cdc_id: p[:gbprov],
          name_p: p[:proven],
          name_c: p[:provch],
          geometry: p[:geometry],
        )

        increment

      end

    end

    def down
      Place.provinces.delete_all
    end

    def count
      @DB[:province_cdc_4326].count
    end

  end
end
