
require 'rails_helper'

describe 'Time Slider', type: :feature do


  describe 'filter' do

    it 'collections' do

      n1 = create(:notice, deadline: '2009-01-01') # in range
      n2 = create(:notice, deadline: '2011-01-01') # not in range

      create(:collection, id: 1, notice: n1)
      create(:collection, id: 2, notice: n2)

      visit('api/collections.json')

      write_collection_fixture('time-slider', 'filter', page)

    end

  end


end
