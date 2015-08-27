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
#

require 'rails_helper'

describe Collection, type: :model do

  describe "columns" do
    it { should have_db_column(:notice_id).with_options(null: false) }
  end

  describe 'indexes' do
    it { should have_db_index(:notice_id) }
  end

  describe "validations" do
    it { should validate_presence_of(:notice) }
  end

  describe 'relationships' do
    it { should belong_to(:notice) }
  end

end
