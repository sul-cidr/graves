
require 'rails_helper'

describe 'Collection Markers', type: :feature do

  it 'show-modal' do

    create(:collection, id: 1, geometry: Helpers::Geo.point(0, 0))

    visit('api/collections.json')

    write_collection_fixture('collection-modal', 'show-modal', page)

  end

end
