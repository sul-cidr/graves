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
  # Flip off the is_default flag.
  #
  before_save do
    if is_default
      self.class.update_all(is_default: false)
    end
  end

  #
  # Get the default layer.
  #
  def self.default
    find_by(is_default: true) or first
  end

end
