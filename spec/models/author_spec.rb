# == Schema Information
#
# Table name: authors
#
#  id          :integer          not null, primary key
#  first_name  :text
#  last_name   :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  affiliation :string
#

require 'rails_helper'

describe Author, type: :model do
  # TODO
end
