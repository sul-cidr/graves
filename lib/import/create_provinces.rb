
module Import
  class CreateProvinces < Step

    def shapefile
      super('cdc/provinces/2010ProvA.shp')
    end

    def up

      type = PlaceType.province

      shapefile.each do |record|

        Place.create!(
          place_type: type,
          cdc_id: record['GbProv'],
          name_p: record['ProvEN'],
          name_c: record['ProvCH'],
          geometry: record.geometry,
        )

        increment

      end

    end

    def down
      Place.provinces.delete_all
    end

    def count
      shapefile.num_records
    end

  end
end
