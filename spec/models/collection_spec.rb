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
#  lonlat      :geometry({:srid= point, 0
#  place_id    :integer
#

require 'rails_helper'

describe Collection, type: :model do

  describe "columns" do
    it { should have_db_column(:notice_id).with_options(null: false) }
  end

  describe 'indexes' do
    it { should have_db_index(:notice_id) }
    it { should have_db_index(:place_id) }
    it { should have_db_index(:lonlat) }
  end

  describe "validations" do
    it { should validate_presence_of(:notice) }
  end

  describe 'relationships' do
    it { should belong_to(:notice) }
    it { should belong_to(:place) }
  end

  xdescribe '#link_with_place()' do

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

    # 2 2x2 counties, each inside a province:

    let!(:c1) {
      create(:county, geometry: Helpers::Geo.polygon(
        [1, 1],
        [1, 3],
        [3, 3],
        [3, 1],
      ))
    }

    let!(:c2) {
      create(:county, geometry: Helpers::Geo.polygon(
        [5, 1],
        [5, 3],
        [7, 3],
        [7, 1],
      ))
    }

    # 2 towns, each inside a county:

    let!(:t1) {
      create(:town, geometry: Helpers::Geo.point(2, 2));
    }

    let!(:t2) {
      create(:town, geometry: Helpers::Geo.point(6, 2));
    }

    it 'links to the closest town, when one is defined' do

      # Closest to town 1.
      c = create(
        :collection_with_town,
        lonlat: Helpers::Geo.point(3, 2),
      )

      c.link_with_place
      expect(c.place_id).to eq(t1.id)

    end

    it 'links to the enclosing county, when one is defined' do

      # Inside county 1.
      c = create(
        :collection_with_county,
        lonlat: Helpers::Geo.point(2, 2),
      )

      c.link_with_place
      expect(c.place_id).to eq(c1.id)

    end

    it 'links to the enclosing province, when one is defined' do

      # Inside province 1.
      c = create(
        :collection_with_province,
        lonlat: Helpers::Geo.point(2, 2),
      )

      c.link_with_place
      expect(c.place_id).to eq(p1.id)

    end

  end

end
