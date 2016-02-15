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

class BaseLayer < ActiveRecord::Base

  validates :label, presence: true
  validates :url, presence: true

  #
  # Get the default layer.
  #
  def self.default
    find_by(is_default: true) or first
  end

  #
  # Flip off the is_default flag.
  #
  def self.clear_default!
    update_all(is_default: false)
  end

end
