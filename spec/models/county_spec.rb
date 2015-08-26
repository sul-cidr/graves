require 'rails_helper'

describe County, type: :model do

  describe 'indexes' do
    it { should have_db_index(:geometry) }
  end

end
