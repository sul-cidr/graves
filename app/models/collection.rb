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
#  geometry    :geometry({:srid= point, 4326
#  province_id :integer
#  county_id   :integer
#  town_id     :integer
#  legacy_id   :integer
#

class Collection < ActiveRecord::Base

  include Geometry

  belongs_to :notice
  belongs_to :province
  belongs_to :county
  belongs_to :town

  has_many :collection_tag_rels
  has_many :tags, through: :collection_tag_rels

  validates :notice, presence: true

  #
  # Aggregate on the tag list.
  #
  scope :with_tag_list, -> {
    joins{tags.outer}.group{id}.select {
      array_agg(tags.tag).as(tag_list)
    }
  }

  #
  # Map geocoding results into the PostGIS point column.
  #
  geocoded_by :address do |event, results|
    if geo = results.first
      event.geometry = Helpers::Geo.point(geo.longitude, geo.latitude)
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
  # Link collections with CDC records.
  #
  def self.link_cdc

    bar = ProgressBar.new(all.count)

    all.each do |c|

      if c.has_town?
        c.town = Town.find_by_collection(c)
      elsif c.has_county?
        c.county = County.find_by_collection(c)
      elsif c.has_province?
        c.province = Province.find_by_collection(c)
      end

      c.save
      bar.increment!

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

end
