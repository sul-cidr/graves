# == Schema Information
#
# Table name: authors
#
#  id          :integer          not null, primary key
#  first_name  :text             not null
#  last_name   :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  affiliation :string           not null
#

class Author < ActiveRecord::Base

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :affiliation, presence: true

  #
  # Construct a full name.
  #
  # @return [String]
  #
  def full_name
    "#{first_name} #{last_name}"
  end

end
