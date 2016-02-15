# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  url        :string           not null
#  is_default :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

describe BaseLayer, type: :model do

  describe 'columns' do

    it { should have_db_column(:label).with_options(null: false) }
    it { should have_db_column(:url).with_options(null: false) }

    it {
      should have_db_column(:is_default).with_options(
        null: false,
        default: false,
      )
    }

  end

  describe 'validations' do
    it { should validate_presence_of(:label) }
    it { should validate_presence_of(:url) }
  end

  describe '.default()' do

    it 'returns the layer marked default, when one exists' do

      create(:base_layer)
      create(:base_layer)

      default = create(:base_layer, is_default: true)

      expect(BaseLayer.default).to eq(default)

    end

    it 'returns the first layer added, when no layer is marked' do

      first = create(:base_layer)

      create(:base_layer)
      create(:base_layer)

      expect(BaseLayer.default).to eq(first)

    end

  end

  describe 'before_save' do

    it 'clears old default when a new default is saved' do

      old = create(:base_layer, is_default: true)
      new = create(:base_layer, is_default: true)

      old.reload
      new.reload

      expect(old.is_default).to be(false)
      expect(new.is_default).to be(true)

    end

  end

end
