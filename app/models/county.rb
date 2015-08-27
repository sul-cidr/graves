# == Schema Information
#
# Table name: counties
#
#  id          :integer          not null, primary key
#  cdc_id      :string
#  name_p      :string
#  name_c      :string
#  geometry    :geometry({:srid= multipolygon, 0
#  province_id :integer
#

class County < ActiveRecord::Base
end
