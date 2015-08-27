require 'rails_helper'

describe PlaceType, type: :model do

  describe 'indexes' do
    it { should have_db_index(:type) }
  end

end
