
module Helpers::Geo

  #
  # Alias the cartesian geometry factory.
  #
  # returns [RGeo::Geos::CAPIFactory]
  #
  def self.factory
    RGeo::Cartesian.preferred_factory
  end

  #
  # Create a point geometry.
  #
  # @param x [Float]
  # @param y [Float]
  # @returns [RGeo::Geos::CAPIPointImpl]
  #
  def self.point(x, y)
    factory.point(x, y)
  end

end
