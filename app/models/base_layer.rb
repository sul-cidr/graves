# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BaseLayer < ActiveRecord::Base

  validates :name, presence: true
  validates :url, presence: true

end
