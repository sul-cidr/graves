# == Schema Information
#
# Table name: towns
#
#  id       :integer          not null, primary key
#  cdc_id   :string
#  name_p   :string
#  name_c   :string
#  geometry :geometry({:srid= point, 0
#

FactoryGirl.define do
  factory :town do
    
  end

end
