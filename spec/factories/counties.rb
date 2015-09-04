# == Schema Information
#
# Table name: counties
#
#  id          :integer          not null, primary key
#  province_id :integer
#  cdc_id      :string
#  name_p      :string
#  name_c      :string
#  geometry    :geometry({:srid= geometry, 0
#

FactoryGirl.define do
  factory :county do
  end
end
