# == Schema Information
#
# Table name: provinces
#
#  id       :integer          not null, primary key
#  cdc_id   :string
#  name_p   :string
#  name_c   :string
#  geometry :geometry({:srid= geometry, 4326
#

class Province < ActiveRecord::Base

  #
  # Select geometry as GeoJSON.
  #
  scope :snap, -> {
    select {
      my{column_names} -
      ['geometry'] +
      [ST_AsGeoJSON(ST_FlipCoordinates(geometry), 2).as(geojson)]
    }
  }

  #
  # Match a grave collection with a province.
  #
  # @param c [Collection]
  # @return [Province]
  #
  def self.find_by_collection(c)
    where { ST_Contains(geometry, c.lonlat) }.first
  end

end
