# == Schema Information
#
# Table name: towns
#
#  id        :integer          not null, primary key
#  county_id :integer
#  cdc_id    :string
#  name_p    :string
#  name_c    :string
#  geometry  :geometry({:srid= geometry, 0
#

require 'rails_helper'

describe Town, type: :model do

  describe 'indexes' do
    it { should have_db_index(:cdc_id).unique }
    it { should have_db_index(:geometry) }
  end

  describe 'relationships' do
    it { should belong_to(:county) }
  end

  describe '.find_by_collection()' do

    # 2 towns:

    let!(:t1) {
      create(:town, geometry: Helpers::Geo.point(2, 2));
    }

    let!(:t2) {
      create(:town, geometry: Helpers::Geo.point(6, 2));
    }

    it 'links to the closest town' do

      # Closest to town 1.
      c = create(
        :collection_with_town,
        lonlat: Helpers::Geo.point(3, 2),
      )

      t = Town.find_by_collection(c)
      expect(t.id).to eq(t1.id)

    end

  end

end
