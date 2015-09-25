# == Schema Information
#
# Table name: narratives
#
#  id         :integer          not null, primary key
#  title      :text
#  markup     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer          not null
#

require 'rails_helper'

describe Narrative, type: :model do

  describe "columns" do
    it { should have_db_column(:author_id).with_options(null: false) }
  end

  describe 'relationships' do
    it { should belong_to(:author) }
  end

  describe "validations" do
    it { should validate_presence_of(:author) }
  end

end
