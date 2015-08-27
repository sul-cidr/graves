# == Schema Information
#
# Table name: counties
#
#  id          :integer          not null, primary key
#  cdc_id      :string
#  name_p      :string
#  name_c      :string
#  geometry    :geometry({:srid= multipolygon, 0
#  province_id :integer
#

FactoryGirl.define do
  factory :county do
  end
end
