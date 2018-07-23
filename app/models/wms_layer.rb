# == Schema Information
#
# Table name: wms_layers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  address    :string           not null
#  layer      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class WmsLayer < ActiveRecord::Base

  include Slug

  has_and_belongs_to_many :narratives

  validates :name, presence: true
  validates :address, presence: true
  validates :layer, presence: true

end
