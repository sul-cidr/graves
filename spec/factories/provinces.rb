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

FactoryGirl.define do
  factory :province do
  end
end
