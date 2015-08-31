# == Schema Information
#
# Table name: counties
#
#  id          :integer          not null, primary key
#  cdc_id      :string
#  name_p      :string
#  name_c      :string
#  geometry    :geometry({:srid= multipolygon, 0
#  province_id :integer
#

require 'rails_helper'

describe County, type: :model do

  describe 'indexes' do
    it { should have_db_index(:geometry) }
  end

end
