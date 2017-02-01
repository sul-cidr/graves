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
#  demographics :jsonb            not null
#  choropleths  :jsonb            not null
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
  # Write 0-1 choropleth values for each demographic code.
  #
  def self.generate_choropleths

    codes = first.demographics.keys
    bar = ProgressBar.new(codes.count * all.count)

    codes.each do |code|

      # Get a normalized max value.
      max = Math.sqrt(maximum("(demographics->>'#{code}')::float"))

      # Write a ratio for each row.
      all.each do |c|

        ratio = Math.sqrt(c.demographics[code]) / max
        c.choropleths[code] = ratio.round(2)

        c.save
        bar.increment!

      end

    end

  end

  #
  # Serialize to CSV
  #
  # @param options [Hash]. CSV options
  #
  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |row|
        csv << row.attributes.values_at(*column_names)
      end
    end
  end

end
