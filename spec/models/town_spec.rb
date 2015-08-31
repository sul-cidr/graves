# == Schema Information
#
# Table name: towns
#
#  id        :integer          not null, primary key
#  cdc_id    :string
#  name_p    :string
#  name_c    :string
#  geometry  :geometry({:srid= point, 0
#  county_id :integer
#

require 'rails_helper'

describe Town, type: :model do

  describe 'indexes' do
    it { should have_db_index(:geometry) }
  end

end
