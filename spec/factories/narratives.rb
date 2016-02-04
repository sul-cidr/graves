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
#  pub_date   :date
#

FactoryGirl.define do

  sequence :narrative_slug do |n|
    "narrative-#{n}"
  end

  sequence :narrative_title do |n|
    "Title #{n}"
  end

  factory :narrative do

    author

    slug { generate(:narrative_slug) }

    title { generate(:narrative_title) }

    blurb 'Short description.'

    markup '<p>Narrative.</p>'

    pub_date Date.today

  end

end
