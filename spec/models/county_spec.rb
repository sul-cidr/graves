# == Schema Information
#
# Table name: counties
#
#  id          :integer          not null, primary key
#  province_id :integer
#  cdc_id      :string
#  name_p      :string
#  name_c      :string
#  geometry    :geometry({:srid= geometry, 4326
#

require 'rails_helper'

describe County, type: :model do

  describe "columns" do
    it { should have_db_column(:metadata).with_options(null: false) }
  end

  describe 'indexes' do
    it { should have_db_index(:cdc_id).unique }
    it { should have_db_index(:geometry) }
  end

  describe 'relationships' do
    it { should belong_to(:province) }
  end

  describe '.find_by_collection()' do

    # 2 4x4 counties:

    let!(:c1) {
      create(:county, geometry: Helpers::Geo.polygon(
        [0, 0],
        [0, 4],
        [4, 4],
        [4, 0],
      ))
    }

    let!(:c2) {
      create(:county, geometry: Helpers::Geo.polygon(
        [4, 0],
        [4, 4],
        [8, 4],
        [8, 0],
      ))
    }

    it 'links to the enclosing county' do

      # Inside county 1.
      c = create(
        :collection_with_county,
        geometry: Helpers::Geo.point(2, 2),
      )

      p = County.find_by_collection(c)
      expect(p.id).to eq(c1.id)

    end

  end

end
