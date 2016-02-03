# == Schema Information
#
# Table name: narratives
#
#  id         :integer          not null, primary key
#  title      :text
#  markup     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer          not null
#  slug       :string           not null
#  blurb      :string
#

FactoryGirl.define do

  sequence :narrative_slug do |n|
    "narrative-#{n}"
  end

  factory :narrative do

    author

    slug { generate(:narrative_slug) }

    title 'Title'

    blurb 'Short description.'

    markup '<p>Markup.</p>'

  end

end
