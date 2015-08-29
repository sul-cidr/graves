# == Schema Information
#
# Table name: collections
#
#  id          :integer          not null, primary key
#  num_graves  :integer
#  location    :string
#  destination :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  province_p  :string
#  province_c  :string
#  prefect_p   :string
#  prefect_c   :string
#  county_p    :string
#  county_c    :string
#  town_p      :string
#  town_c      :string
#  village_p   :string
#  village_c   :string
#  notice_id   :integer          not null
#  lonlat      :geometry({:srid= point, 0
#

class Collection < ActiveRecord::Base

  belongs_to :notice
  validates :notice, presence: true

  #
  # Map geocoding results into the PostGIS point column.
  #
  geocoded_by :address do |event, results|
    if geo = results.first
      event.lonlat = Helpers::Geo.point(geo.longitude, geo.latitude)
    end
  end

  #
  # Form a Chinese geocoding query.
  #
  def address_c
    [province_c, prefect_c, county_c, town_c, village_c].join(' ')
  end

  #
  # Form a Pinyin geocoding query.
  #
  def address_p
    [province_p, prefect_p, county_p, town_p, village_p].join(' ')
  end

end
