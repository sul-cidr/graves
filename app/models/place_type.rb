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

end
