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

  describe ':by_type' do

    it 'matches by a given type' do

      t1 = create(:place_type, name: 'type1')
      t2 = create(:place_type, name: 'type2')

      p1 = create(:place, place_type: t1)
      p2 = create(:place, place_type: t1)
      create(:place, place_type: t2)

      places = Place.by_type('type1')
      expect(places).to be_records(p1, p2)

    end

  end

  describe ':provinces' do

    it 'matches provinces' do

      p1 = create(:province)
      p2 = create(:province)

      create(:county)
      create(:town)

      expect(Place.provinces).to be_records(p1, p2)

    end

  end

  describe ':counties' do

    it 'matches counties' do

      c1 = create(:county)
      c2 = create(:county)

      create(:province)
      create(:town)

      expect(Place.counties).to be_records(c1, c2)

    end

  end

  describe ':towns' do

    it 'matches towns' do

      t1 = create(:town)
      t2 = create(:town)

      create(:province)
      create(:county)

      expect(Place.towns).to be_records(t1, t2)

    end

  end

end
