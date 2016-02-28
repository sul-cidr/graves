# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  tag        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


FactoryGirl.define do

  sequence :tag_label do |n|
    "Tag #{n}"
  end

  sequence :tag_tag do |n|
    "tag-#{n}"
  end

  factory :tag do
    label { generate(:tag_label) }
    tag { generate(:tag_tag) }
  end

end
