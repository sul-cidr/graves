# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :wms_layer do

    name 'Layer'

    address 'http://stanford.edu/wms'

    layer 'layer'

  end
end
