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

class WmsLayer < ActiveRecord::Base

  validates :address, presence: true
  validates :layer, presence: true

end
