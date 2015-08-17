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
#  province_e  :string
#  province_c  :string
#  prefect_e   :string
#  prefect_c   :string
#  county_e    :string
#  county_c    :string
#  town_e      :string
#  town_c      :string
#  village_e   :string
#  village_c   :string
#

class Collection < ActiveRecord::Base
end
