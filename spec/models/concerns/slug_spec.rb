
require 'rails_helper'

describe Slug do

  with_model :SlugModel do

    table do |t|
      t.string :slug
    end

    model do
      include Slug
    end

  end

  describe 'validations' do

    subject { SlugModel.new }

    it { should validate_presence_of(:slug) }
    it { should validate_uniqueness_of(:slug) }

    describe 'slug format' do

      it 'blocks spaces' do
        s = SlugModel.new(slug: 'slug with spaces')
        expect(s).to be_invalid
      end

      it 'blocks punctuation' do
        s = SlugModel.new(slug: 'slug!')
        expect(s).to be_invalid
      end

      it 'blocks capitals letters' do
        s = SlugModel.new(slug: 'SLUG')
        expect(s).to be_invalid
      end

      it 'allows lowercase letters' do
        s = SlugModel.new(slug: 'slug')
        expect(s).to be_valid
      end

      it 'allows numbers' do
        s = SlugModel.new(slug: 'slug1')
        expect(s).to be_valid
      end

      it 'allows dashes' do
        s = SlugModel.new(slug: 'slug-1')
        expect(s).to be_valid
      end

    end

  end

end
