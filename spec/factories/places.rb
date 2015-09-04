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

FactoryGirl.define do

  sequence :place_cdc_id do |n|
    n
  end

  factory :place do

    cdc_id { generate(:place_cdc_id) }

    #factory :province do
      #place_type { PlaceType.province }
    #end

    #factory :county do
      #place_type { PlaceType.county }
    #end

    #factory :town do
      #place_type { PlaceType.town }
    #end

  end

end
