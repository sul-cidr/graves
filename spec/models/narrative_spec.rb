# == Schema Information
#
# Table name: narratives
#
#  id                      :integer          not null, primary key
#  title                   :string
#  markup                  :text
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  author_id               :integer          not null
#  slug                    :string           not null
#  blurb                   :text
#  pub_date                :date
#  subtitle                :string
#  base_layer_id           :integer          not null
#  hero_image_file_name    :string
#  hero_image_content_type :string
#  hero_image_file_size    :integer
#  hero_image_updated_at   :datetime
#

require 'rails_helper'

describe Narrative, type: :model do

  describe 'indexes' do
    it { should have_db_index(:author_id) }
    it { should have_db_index(:base_layer_id) }
    it { should have_db_index(:slug).unique(true) }
  end

  describe 'columns' do
    it { should have_db_column(:author_id).with_options(null: false) }
    it { should have_db_column(:base_layer_id).with_options(null: false) }
    it { should have_db_column(:slug).with_options(null: false) }
  end

  describe 'relationships' do
    it { should belong_to(:author) }
    it { should belong_to(:base_layer) }
  end

  describe 'validations' do

    subject { build(:narrative) }

    it { should validate_presence_of(:author) }
    it { should validate_presence_of(:base_layer) }

  end

end
