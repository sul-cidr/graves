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
  # Register a step.
  #
  # @param step [String]
  #
  def self.up(s)
    create(step: s)
  end

  #
  # Has a step been run?
  #
  # @param step [String]
  #
  def self.satisfied?(s)
    where { step == s }.exists?
  end

end
