
module Import
  class CreateTowns < Step

    @depends = [CreateCounties]

    def shapefile
      super('cdc/towns/2010TownshipCensus.shp')
    end

    def up

      shapefile.each do |record|

        # Find the parent county.
        county = County.find_by(cdc_id: record[:GBTownship][0..5])

        Town.create!(
          county: county,
          cdc_id: record['GBTownship'],
          name_p: record['TownshipEN'],
          name_c: record['TownshipCH'],
          geometry: record.geometry,
        )

        increment

      end

    end

    def down
      Town.delete_all
    end

    def count
      shapefile.num_records
    end

  end
end
