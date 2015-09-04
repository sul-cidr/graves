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
