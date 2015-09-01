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
#  place_id    :integer
#

class Collection < ActiveRecord::Base

  belongs_to :notice
  belongs_to :place

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
  # Geocode all collections.
  #
  # @param delay [Float]
  #
  def self.geocode(delay=0.25)

    bar = ProgressBar.new(all.count)

    all.each do |c|

      # Geocode.
      c.geocode
      c.save
      bar.increment!

      # Throttle.
      sleep(delay)

    end

  end

  #
  # TODO|dev
  # Link all collections with CDC records.
  #
  def self.link_cdc
    all.each do |c|
      c.link_with_place
      c.save
    end
  end

  #
  # Form a geocoding query for Baidu.
  #
  def address
    [province_c, county_c, town_c].join(',')
  end

  #
  # Is a Chinese province defined?
  #
  def has_province?
    !!province_c
  end

  #
  # Is a Chinese county defined?
  #
  def has_county?
    !!province_c and !!county_c
  end

  #
  # Is a Chinese town defined?
  #
  def has_town?
    !!province_c and !!county_c and !!town_c
  end

  #
  # Try to link the collection with a CDC division.
  #
  def link_with_place

    # TODO
    # - make this a class method on Place
    # - add Place.provinces / counties / towns scopes
    # - add has_province / county / town helpers

    if province_c and county_c and town_c

      self.place = Place
        .by_type('town')
        .select { ['places.*', ST_Distance(geometry, my{lonlat}).as(dist)] }
        .order('dist')
        .limit(1)
        .first

    elsif province_c and county_c

      self.place = Place
        .by_type('county')
        .where { ST_Contains(geometry, my{lonlat}) }
        .first

    elsif province_c

      self.place = Place
        .by_type('province')
        .where { ST_Contains(geometry, my{lonlat}) }
        .first

    end

  end

end
