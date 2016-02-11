# == Schema Information
#
# Table name: import_steps
#
#  id       :integer          not null, primary key
#  step     :string           not null
#  finished :boolean          default(FALSE)
#

require 'rails_helper'

describe ImportStep, type: :model do

  describe 'indexes' do
    it { should have_db_index(:step).unique }
  end

  describe 'validations' do
    subject { create(:import_step) }
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

  describe '.up()' do

    it 'registers a row for a step' do
      ImportStep.up('Step')
      expect(ImportStep.satisfied?('Step')).to be true
    end

  end

  describe '.down()' do

    before(:each) do
      create(:import_step, step: 'Step1')
      create(:import_step, step: 'Step2')
    end

    it 'removes the row for a step' do
      ImportStep.down('Step2')
      expect(ImportStep.satisfied?('Step1')).to be true
      expect(ImportStep.satisfied?('Step2')).to be false
    end

  end

end
