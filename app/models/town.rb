# == Schema Information
#
# Table name: towns
#
#  id        :integer          not null, primary key
#  county_id :integer
#  cdc_id    :string
#  name_p    :string
#  name_c    :string
#  geometry  :geometry({:srid= geometry, 4326
#

class Town < ActiveRecord::Base

  belongs_to :county

  #
  # Match a grave collection with a town.
  #
  # @param c [Collection]
  # @return [Province]
  #
  def self.find_by_collection(c)
    select { ['towns.*', ST_Distance(geometry, c.lonlat).as(d)] }
      .order('d').limit(1).first
  end

end
