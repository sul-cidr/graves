# == Schema Information
#
# Table name: provinces
#
#  id       :integer          not null, primary key
#  cdc_id   :string
#  name_p   :string
#  name_c   :string
#  geometry :geometry({:srid= multipolygon, 0
#

FactoryGirl.define do
  factory :province do
    
  end

end
