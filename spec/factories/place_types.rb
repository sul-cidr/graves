# == Schema Information
#
# Table name: place_types
#
#  id   :integer          not null, primary key
#  name :string           not null
#

FactoryGirl.define do

  sequence :place_type_name do |n|
    "TYPE#{n}"
  end

  factory :place_type do
    name { generate(:place_type_name) }
  end

end
