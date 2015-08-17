# == Schema Information
#
# Table name: collections
#
#  id          :integer          not null, primary key
#  grave_count :integer
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
#

require 'rails_helper'

RSpec.describe Collection, type: :model do
  # TODO
end
