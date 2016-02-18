
require 'rails_helper'

describe 'Collection Markers', type: :feature do

  it 'add-markers' do

    create(:collection, id: 1, geometry: Helpers::Geo.point(1, 2))
    create(:collection, id: 2, geometry: Helpers::Geo.point(3, 4))
    create(:collection, id: 3, geometry: Helpers::Geo.point(5, 6))

    visit('api/collections.json')

    write_collection_fixture('collection-markers', 'add-markers', page)

  end

  it 'show-modal' do

    create(:collection, id: 1, geometry: Helpers::Geo.point(0, 0))

    visit('api/collections.json')

    write_collection_fixture('collection-markers', 'show-modal', page)

  end

end
