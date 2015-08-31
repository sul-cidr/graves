# == Schema Information
#
# Table name: place_types
#
#  id   :integer          not null, primary key
#  name :string           not null
#

class PlaceType < ActiveRecord::Base

  has_many :places

  #
  # Insert default types.
  #
  def self.seed
    create([
      { name: 'province' },
      { name: 'county' },
      { name: 'town' },
    ])
  end

  #
  # Provide the province type.
  #
  # @return [PlaceType]
  #
  def self.province
    find_by(name: 'province')
  end

  #
  # Provide the county type.
  #
  # @return [PlaceType]
  #
  def self.county
    find_by(name: 'county')
  end

  #
  # Provide the town type.
  #
  # @return [PlaceType]
  #
  def self.town
    find_by(name: 'town')
  end

end
