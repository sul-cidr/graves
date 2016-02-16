# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :base_layer do

    label 'Layer'

    url 'http://{s}.osm.org/{z}/{x}/{y}.png'

  end
end
