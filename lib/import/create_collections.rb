
module Import
  class CreateCollections < Step

    @depends = [CreateNotices]

    def up
      @DB[:master_20150601].distinct(:rid).each do |r|

        # Find parent notice.
        notice = Notice.find_by(legacy_id: r[:nid])

        Collection.create(
          notice:       notice,
          num_graves:   r[:num_graves],
          province_p:   r[:province_e],
          province_c:   r[:province_c],
          prefect_p:    r[:prefect_e],
          prefect_c:    r[:prefect_c],
          county_p:     r[:county_e],
          county_c:     r[:county_c],
          town_p:       r[:town_e],
          town_c:       r[:town_c],
          village_p:    r[:village_e],
          village_c:    r[:village_c],
          destination:  r[:destination],
          location:     r[:location],
        )

        increment

      end
    end

    def down
      Collection.delete_all
    end

    def count
      @DB[:master_20150601].distinct(:rid).count()
    end

  end
end
