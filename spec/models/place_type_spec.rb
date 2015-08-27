# == Schema Information
#
# Table name: place_types
#
#  id   :integer          not null, primary key
#  name :string
#

require 'rails_helper'

describe PlaceType, type: :model do

  describe 'indexes' do
    it { should have_db_index(:name).unique }
  end

  describe 'relationships' do
    it { should have_many(:places) }
  end

end
