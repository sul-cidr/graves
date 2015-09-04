# == Schema Information
#
# Table name: provinces
#
#  id       :integer          not null, primary key
#  cdc_id   :string
#  name_p   :string
#  name_c   :string
#  geometry :geometry({:srid= geometry, 0
#

require 'rails_helper'

describe Province, type: :model do

  describe 'indexes' do
    it { should have_db_index(:cdc_id).unique }
    it { should have_db_index(:geometry) }
  end

  describe '.find_by_collection()' do

    # 2 4x4 provinces:

    let!(:p1) {
      create(:province, geometry: Helpers::Geo.polygon(
        [0, 0],
        [0, 4],
        [4, 4],
        [4, 0],
      ))
    }

    let!(:p2) {
      create(:province, geometry: Helpers::Geo.polygon(
        [4, 0],
        [4, 4],
        [8, 4],
        [8, 0],
      ))
    }

    it 'links to the enclosing province' do

      # Inside province 1.
      c = create(
        :collection_with_province,
        lonlat: Helpers::Geo.point(2, 2),
      )

      p = Province.find_by_collection(c)
      expect(p.id).to eq(p1.id)

    end

  end

end
