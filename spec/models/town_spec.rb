# == Schema Information
#
# Table name: towns
#
#  id     :integer          not null, primary key
#  cdc_id :string
#  name_p :string
#  name_c :string
#

require 'rails_helper'

describe Town, type: :model do

  describe 'indexes' do
    it { should have_db_index(:lonlat) }
  end

end
