# == Schema Information
#
# Table name: places
#
#  id            :integer          not null, primary key
#  place_type_id :integer          not null
#  cdc_id        :string
#  name_p        :string
#  name_c        :string
#  geometry      :geometry({:srid= geometry, 0
#

class Place < ActiveRecord::Base

  belongs_to :place_type
  validates :place_type, presence: true

  #
  # Match places of a given type.
  #
  # @param type [String]
  #
  scope :by_type, -> (type) {
    joins { place_type }.where {
      place_type.name == type
    }
  }

  #
  # Match provinces.
  #
  scope :provinces, -> {
    by_type('province')
  }

  #
  # Match counties.
  #
  scope :counties, -> {
    by_type('county')
  }

  #
  # Match towns.
  #
  scope :towns, -> {
    by_type('town')
  }

  #
  # Match a grave collection with a CDC place.
  #
  # @param c [Collection]
  # @return [Place]
  #
  def self.find_by_collection(c)

    if c.has_town?

      # "Snap" the Baidu point onto the closest CDC town.
      Place
        .towns
        .select { ['places.*', ST_Distance(geometry, c.lonlat).as(d)] }
        .order('d')
        .limit(1)
        .first

    elsif c.has_county?

      # Find the enclosing CDC county.
      Place
        .counties
        .where { ST_Contains(geometry, c.lonlat) }
        .first

    elsif c.has_province?

      # Find the enclosing CDC province.
      Place
        .provinces
        .where { ST_Contains(geometry, c.lonlat) }
        .first

    end

  end

end
