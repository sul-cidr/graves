# == Schema Information
#
# Table name: places
#
#  id            :integer          not null, primary key
#  place_type_id :integer
#  cdc_id        :string
#  name_p        :string
#  name_c        :string
#  geometry      :geometry({:srid= geometry, 0
#

class Place < ActiveRecord::Base
  belongs_to :place_type
end
