# == Schema Information
#
# Table name: narratives
#
#  id         :integer          not null, primary key
#  title      :text
#  markup     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer          not null
#  slug       :string           not null
#  blurb      :string
#

require 'rails_helper'

describe Narrative, type: :model do

  describe 'indexes' do
    it { should have_db_index(:author_id) }
    it { should have_db_index(:slug).unique(true) }
  end

  describe 'columns' do
    it { should have_db_column(:author_id).with_options(null: false) }
    it { should have_db_column(:slug).with_options(null: false) }
  end

  describe 'relationships' do
    it { should belong_to(:author) }
  end

  describe 'validations' do

    subject { build(:narrative) }

    it { should validate_presence_of(:author) }
    it { should validate_presence_of(:slug) }
    it { should validate_uniqueness_of(:slug) }

    describe 'slug format' do

      it 'blocks spaces' do
        s = build(:narrative, slug: 'slug with spaces')
        expect(s).to be_invalid
      end

      it 'blocks punctuation' do
        s = build(:narrative, slug: 'slug!')
        expect(s).to be_invalid
      end

      it 'blocks capitals letters' do
        s = build(:narrative, slug: 'SLUG')
        expect(s).to be_invalid
      end

      it 'allows lowercase letters' do
        s = build(:narrative, slug: 'slug')
        expect(s).to be_valid
      end

      it 'allows numbers' do
        s = build(:narrative, slug: 'slug1')
        expect(s).to be_valid
      end

      it 'allows dashes' do
        s = build(:narrative, slug: 'slug-1')
        expect(s).to be_valid
      end

    end

  end

end
