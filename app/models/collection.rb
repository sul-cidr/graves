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
#

class Collection < ActiveRecord::Base
end
