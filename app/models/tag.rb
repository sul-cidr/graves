# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  tag        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base

  validates :label, presence: true, uniqueness: true
  validates :tag, presence: true, uniqueness: true

end
