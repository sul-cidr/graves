# == Schema Information
#
# Table name: notices
#
#  id          :integer          not null, primary key
#  pub_date    :date
#  notice_date :date
#  deadline    :date
#  url         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Notice, type: :model do
  # TODO
end
