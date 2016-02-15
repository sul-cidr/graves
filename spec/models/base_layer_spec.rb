# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  url        :string           not null
#  default    :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

describe BaseLayer, type: :model do

  describe "validations" do
    it { should validate_presence_of(:label) }
    it { should validate_presence_of(:url) }
  end

end
