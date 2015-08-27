# == Schema Information
#
# Table name: places
#
#  id            :integer          not null, primary key
#  place_type_id :integer          not null
#  cdc_id        :string
#  name_p        :string
#  name_c        :string
#  geometry      :geometry({:srid= geometry, 0
#

require 'rails_helper'

describe Place, type: :model do

  describe "columns" do
    it { should have_db_column(:place_type_id).with_options(null: false) }
  end

  describe 'indexes' do
    it { should have_db_index(:cdc_id).unique }
    it { should have_db_index(:geometry) }
  end

  describe "validations" do
    it { should validate_presence_of(:place_type) }
  end

  describe 'relationships' do
    it { should belong_to(:place_type) }
  end

end
