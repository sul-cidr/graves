# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  url        :string           not null
#  is_default :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

describe BaseLayer, type: :model do

  describe 'columns' do
    it { should have_db_column(:label).with_options(null: false) }
    it { should have_db_column(:url).with_options(null: false) }
  end

  describe 'validations' do
    it { should validate_presence_of(:label) }
    it { should validate_presence_of(:url) }
  end

end
