# == Schema Information
#
# Table name: import_steps
#
#  id   :integer          not null, primary key
#  step :string           not null
#

FactoryGirl.define do

  sequence :import_step_name do |n|
    "ImportStep#{n}"
  end

  factory :import_step do
    step { generate(:import_step_name) }
  end

end
