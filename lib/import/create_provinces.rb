
module Import
  class CreateProvinces < Step

    def shapefile
      super('cdc/provinces.shp')
    end

    def up

      shapefile.each do |record|

        Province.create!(
          cdc_id: record['GbProv'],
          name_p: record['ProvEN'],
          name_c: record['ProvCH'],
          geometry: to_4326(record.geometry),
        )

        increment

      end

    end

    def down
      Province.delete_all
    end

    def count
      shapefile.num_records
    end

  end
end
