# == Schema Information
#
# Table name: towns
#
#  id     :integer          not null, primary key
#  cdc_id :string
#  name_p :string
#  name_c :string
#

class Town < ActiveRecord::Base
end
