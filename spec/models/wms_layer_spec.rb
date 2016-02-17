# == Schema Information
#
# Table name: wms_layers
#
#  id         :integer          not null, primary key
#  address    :string           not null
#  layer      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe WmsLayer, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
