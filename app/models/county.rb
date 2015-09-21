# == Schema Information
#
# Table name: counties
#
#  id           :integer          not null, primary key
#  province_id  :integer
#  cdc_id       :string
#  name_p       :string
#  name_c       :string
#  geometry     :geometry({:srid= geometry, 4326
#  demographics :jsonb            default({}), not null
#  choropleths  :jsonb            default({}), not null
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
  # Get a list of available CDC demographic codes.
  #
  # @return [Array<String>]
  #
  def self.demographic_codes
    first.demographics.keys
  end

  #
  # Write 0-1 choropleth values for each demographic code.
  #
  def self.generate_choropleths
    demographic_codes.each do |key|

      max = Math.sqrt(maximum("(demographics->>'#{key}')::float"))

      all.each do |c|
        c.choropleths[key] = Math.sqrt(c.demographics[key]) / max
        c.save
      end

    end
  end

end
