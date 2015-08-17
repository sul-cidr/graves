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

  describe '.satisfied?()' do

    before(:each) do
      create(:import_step, step: 'Step1')
      create(:import_step, step: 'Step2')
    end

    it 'returns true when the step has been run' do
      expect(ImportStep.satisfied?('Step1')).to be true
      expect(ImportStep.satisfied?('Step2')).to be true
    end

    it 'returns false when the step has not been run' do
      expect(ImportStep.satisfied?('Step3')).to be false
    end

  end

end
