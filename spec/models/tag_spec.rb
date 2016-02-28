# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  tag        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

describe Tag, type: :model do

  describe 'columns' do
    it { should have_db_column(:label).with_options(null: false) }
    it { should have_db_column(:tag).with_options(null: false) }
  end

  describe 'indexes' do
    it { should have_db_index(:label).unique }
    it { should have_db_index(:tag).unique }
  end

  describe 'validations' do

    subject { create(:tag) }

    it { should validate_presence_of(:label) }
    it { should validate_presence_of(:tag) }

    it { should validate_uniqueness_of(:label) }
    it { should validate_uniqueness_of(:tag) }

  end

end
