# == Schema Information
#
# Table name: authors
#
#  id          :integer          not null, primary key
#  first_name  :text             not null
#  last_name   :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  affiliation :string           not null
#

FactoryGirl.define do
  factory :author do

    first_name 'Tom'

    last_name 'Mullaney'

    affiliation 'Stanford'

  end
end
