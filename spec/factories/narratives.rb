# == Schema Information
#
# Table name: narratives
#
#  id                      :integer          not null, primary key
#  title                   :string
#  markup                  :text
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  author_id               :integer          not null
#  slug                    :string           not null
#  blurb                   :text
#  pub_date                :date
#  subtitle                :string
#  base_layer_id           :integer          not null
#  hero_image_file_name    :string
#  hero_image_content_type :string
#  hero_image_file_size    :integer
#  hero_image_updated_at   :datetime
#

FactoryGirl.define do

  sequence :narrative_slug do |n|
    "slug-#{n}"
  end

  sequence :narrative_title do |n|
    "Title #{n}"
  end

  factory :narrative do

    author

    base_layer

    slug { generate(:narrative_slug) }

    title { generate(:narrative_title) }

    blurb 'Short description.'

    markup '<p>Narrative.</p>'

    pub_date Date.today

  end

end
