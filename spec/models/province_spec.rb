# == Schema Information
#
# Table name: provinces
#
#  id       :integer          not null, primary key
#  cdc_id   :string
#  name_p   :string
#  name_c   :string
#  geometry :geometry({:srid= polygon, 0
#

require 'rails_helper'

describe Province, type: :model do
  # TODO
end
