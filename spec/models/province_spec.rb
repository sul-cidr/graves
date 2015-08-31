# == Schema Information
#
# Table name: provinces
#
#  id       :integer          not null, primary key
#  cdc_id   :string
#  name_p   :string
#  name_c   :string
#  geometry :geometry({:srid= multipolygon, 0
#

require 'rails_helper'

describe Province, type: :model do

  describe 'indexes' do
    it { should have_db_index(:geometry) }
  end

end
