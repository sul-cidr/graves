# == Schema Information
#
# Table name: wms_layers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  address    :string           not null
#  layer      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do

  sequence :wms_layer_slug do |n|
    "slug-#{n}"
  end

  factory :wms_layer do

    name 'Layer'

    slug { generate(:base_layer_slug) }

    address 'http://stanford.edu/wms'

    layer 'layer'

  end

end
