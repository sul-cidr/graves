# == Schema Information
#
# Table name: collections
#
#  id          :integer          not null, primary key
#  num_graves  :integer
#  location    :string
#  destination :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  province_p  :string
#  province_c  :string
#  prefect_p   :string
#  prefect_c   :string
#  county_p    :string
#  county_c    :string
#  town_p      :string
#  town_c      :string
#  village_p   :string
#  village_c   :string
#  notice_id   :integer          not null
#  geometry    :geometry({:srid= point, 4326
#  province_id :integer
#  county_id   :integer
#  town_id     :integer
#

require 'rails_helper'

describe Collection, type: :model do

  describe "columns" do
    it { should have_db_column(:notice_id).with_options(null: false) }
  end

  describe 'indexes' do
    it { should have_db_index(:notice_id) }
    it { should have_db_index(:geometry) }
    it { should have_db_index(:province_id) }
    it { should have_db_index(:county_id) }
    it { should have_db_index(:town_id) }
  end

  describe "validations" do
    it { should validate_presence_of(:notice) }
  end

  describe 'relationships' do
    it { should belong_to(:notice) }
    it { should belong_to(:province) }
    it { should belong_to(:county) }
    it { should belong_to(:town) }
  end

  describe '#has_province?()' do

    it 'is true when a province is defined' do
      c = create(:collection_with_province)
      expect(c.has_province?).to be true
    end

    it 'is false when a province is not defined' do
      c = create(:collection)
      expect(c.has_province?).to be false
    end

  end

  describe '#has_county?()' do

    it 'is true when a county is defined' do
      c = create(:collection_with_county)
      expect(c.has_county?).to be true
    end

    it 'is false when a county is not defined' do
      c = create(:collection_with_province)
      expect(c.has_county?).to be false
    end

  end

  describe '#has_town?()' do

    it 'is true when a town is defined' do
      c = create(:collection_with_town)
      expect(c.has_town?).to be true
    end

    it 'is false when a town is not defined' do
      c = create(:collection_with_county)
      expect(c.has_town?).to be false
    end

  end

end
