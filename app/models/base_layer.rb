# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  url        :string           not null
#  default    :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class BaseLayer < ActiveRecord::Base
end
