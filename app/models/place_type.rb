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
      { name: 'PROVINCE' },
      { name: 'COUNTY' },
      { name: 'TOWN' },
    ])
  end

  #
  # Provide the province type.
  #
  # @return [PlaceType]
  #
  def self.province
    find_by(name: 'PROVINCE')
  end

  #
  # Provide the county type.
  #
  # @return [PlaceType]
  #
  def self.county
    find_by(name: 'COUNTY')
  end

  #
  # Provide the town type.
  #
  # @return [PlaceType]
  #
  def self.town
    find_by(name: 'TOWN')
  end

end
