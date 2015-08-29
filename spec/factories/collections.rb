# == Schema Information
#
# Table name: collections
#
#  id          :integer          not null, primary key
#  num_graves  :integer
#  location    :string
#  destination :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  province_p  :string
#  province_c  :string
#  prefect_p   :string
#  prefect_c   :string
#  county_p    :string
#  county_c    :string
#  town_p      :string
#  town_c      :string
#  village_p   :string
#  village_c   :string
#  notice_id   :integer          not null
#  lonlat      :geometry({:srid= point, 0
#  place_id    :integer
#

FactoryGirl.define do
  factory :collection do

    notice

    trait :has_province do
      province_p 'province'
      province_c 'province'
    end

    trait :has_county do
      county_p 'county'
      county_c 'county'
    end

    trait :has_town do
      town_p 'town'
      town_c 'town'
    end

    factory :collection_with_province, traits: [
      :has_province,
    ]

    factory :collection_with_county, traits: [
      :has_province,
      :has_county,
    ]

    factory :collection_with_town, traits: [
      :has_province,
      :has_county,
      :has_town,
    ]

  end
end
