# == Schema Information
#
# Table name: authors
#
#  id          :integer          not null, primary key
#  first_name  :text             not null
#  last_name   :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  affiliation :string           not null
#

require 'rails_helper'

describe Author, type: :model do

  describe 'columns' do
    it { should have_db_column(:first_name).with_options(null: false) }
    it { should have_db_column(:last_name).with_options(null: false) }
    it { should have_db_column(:affiliation).with_options(null: false) }
  end

  describe 'validations' do
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:affiliation) }
  end

end
