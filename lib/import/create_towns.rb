
module Import
  class CreateTowns < Step

    def shapefile
      super('cdc/towns/2010TownshipCensus.shp')
    end

    def up

      type = PlaceType.town

      shapefile.each do |record|

        Place.create!(
          place_type: type,
          cdc_id: record['GBTownship'],
          name_p: record['TownshipEN'],
          name_c: record['TownshipCH'],
          geometry: record.geometry,
        )

        increment

      end

    end

    def down
      Place.towns.delete_all
    end

    def count
      shapefile.num_records
    end

  end
end
