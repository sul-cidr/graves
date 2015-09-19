# == Schema Information
#
# Table name: counties
#
#  id          :integer          not null, primary key
#  province_id :integer
#  cdc_id      :string
#  name_p      :string
#  name_c      :string
#  geometry    :geometry({:srid= geometry, 4326
#

class County < ActiveRecord::Base

  include Geometry

  belongs_to :province

  #
  # Match a grave collection with a province.
  #
  # @param c [Collection]
  # @return [Province]
  #
  def self.find_by_collection(c)
    where { ST_Contains(geometry, c.geometry) }.first
  end

  #
  # Get a list of available CDC attribute codes.
  #
  def self.metadata_keys
    first.metadata.keys
  end

  #
  # Write 0-1 choropleth values for each CDC attribute.
  #
  def self.normalize_choropleths
    metadata_keys.each do |key|

      max = Math.sqrt(maximum("(metadata->>'#{key}')::float"))

      all.each do |c|
        c.choropleths[key] = Math.sqrt(c.metadata[key]) / max
        c.save
      end

    end
  end

end
