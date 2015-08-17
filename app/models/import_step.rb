# == Schema Information
#
# Table name: import_steps
#
#  id   :integer          not null, primary key
#  step :string           not null
#

class ImportStep < ActiveRecord::Base

  validates :step, uniqueness: true

  #
  # Has a step been run?
  #
  # @param step [String]
  #
  def self.satisfied?(step)
    # TODO
  end

end
