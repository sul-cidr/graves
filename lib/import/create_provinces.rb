
module Import
  class CreateProvinces < Step

    def shapefile
      super('cdc/provinces/2010ProvA.shp')
    end

    def up

      factory = RGeo::Geographic.spherical_factory(srid: 4326)

      shapefile.each do |record|

        geometry =  RGeo::Feature.cast(
          record.geometry,
          factory: factory,
          project: true
        )

        Province.create!(
          cdc_id: record['GbProv'],
          name_p: record['ProvEN'],
          name_c: record['ProvCH'],
          geometry: geometry,
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
