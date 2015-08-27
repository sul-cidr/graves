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
  def self.by_type(type)
    joins { place_type }.where{
      place_type.name == type
    }
  end

end
