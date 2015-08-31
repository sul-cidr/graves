# == Schema Information
#
# Table name: place_types
#
#  id   :integer          not null, primary key
#  name :string           not null
#

require 'rails_helper'

describe PlaceType, type: :model do

  describe "columns" do
    it { should have_db_column(:name).with_options(null: false) }
  end

  describe 'indexes' do
    it { should have_db_index(:name).unique }
  end

  describe 'relationships' do
    it { should have_many(:places) }
  end

  describe '.province()' do

    it 'returns the province type' do
      expect(PlaceType.province.name).to eq('PROVINCE')
    end

  end

  describe '.county()' do

    it 'returns the county type' do
      expect(PlaceType.county.name).to eq('COUNTY')
    end

  end

  describe '.town()' do

    it 'returns the town type' do
      expect(PlaceType.town.name).to eq('TOWN')
    end

  end

end
