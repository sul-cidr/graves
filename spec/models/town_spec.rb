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

end
