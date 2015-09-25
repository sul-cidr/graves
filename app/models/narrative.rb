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
#

class Narrative < ActiveRecord::Base

  belongs_to :author

  validates :author, presence: true

  validates :slug, presence: true
  validates :slug, uniqueness: true
  validates :slug, format: { with: /\A[a-z0-9-]*\z/ }

end
