class Town < ActiveRecord::Base
  belongs_to :county
end
