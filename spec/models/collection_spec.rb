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

require 'rails_helper'

RSpec.describe Collection, type: :model do
  # TODO
end
