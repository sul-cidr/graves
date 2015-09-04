# == Schema Information
#
# Table name: towns
#
#  id        :integer          not null, primary key
#  county_id :integer
#  cdc_id    :string
#  name_p    :string
#  name_c    :string
#  geometry  :geometry({:srid= geometry, 0
#

class Town < ActiveRecord::Base
  belongs_to :county
end
