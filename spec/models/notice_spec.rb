# == Schema Information
#
# Table name: notices
#
#  id            :integer          not null, primary key
#  pub_date      :date
#  notice_date   :date
#  deadline      :date
#  url           :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  site_p        :string
#  site_c        :string
#  title_p       :string
#  title_c       :string
#  org_p         :string
#  org_c         :string
#  contact_p     :string
#  contact_c     :string
#  contact_phone :string
#

require 'rails_helper'

describe Notice, type: :model do

  describe 'associations' do
    it { should have_many(:collections) }
  end

end
