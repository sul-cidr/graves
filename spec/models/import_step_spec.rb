# == Schema Information
#
# Table name: import_steps
#
#  id   :integer          not null, primary key
#  step :string           not null
#

require 'rails_helper'

describe ImportStep, type: :model do

  describe 'indexes' do
    it { should have_db_index(:step).unique(true) }
  end

  describe 'validations' do
    it { should validate_uniqueness_of(:step) }
  end

end
