
require 'rails_helper'

describe 'Collection Markers', type: :feature do

  it 'add-markers' do

    create(
      :collection,
      id: 1,
      geometry: Helpers::Geo.point(1, 2),
    )

    create(
      :collection,
      id: 2,
      geometry: Helpers::Geo.point(3, 4),
    )

    create(
      :collection,
      id: 3,
      geometry: Helpers::Geo.point(5, 6),
    )

    create(
      :collection,
      id: 4,
      geometry: Helpers::Geo.point(7, 8),
      no_marker: true
    )

    visit('api/collections.json')

    write_collection_fixture('collection-markers', 'add-markers', page)

  end

  it 'show-tooltips' do

    create(
      :collection,
      id: 1,
      geometry: Helpers::Geo.point(0, 0),
      town_p: 'town',
      county_p: 'county',
      province_p: 'province',
    )

    create(
      :collection,
      id: 2,
      geometry: Helpers::Geo.point(0, 0),
      county_p: 'county',
      province_p: 'province',
    )

    create(
      :collection,
      id: 3,
      geometry: Helpers::Geo.point(0, 0),
      province_p: 'province',
    )

    create(
      :collection,
      id: 4,
      geometry: Helpers::Geo.point(0, 0),
      no_marker: true
    )

    visit('api/collections.json')

    write_collection_fixture('collection-markers', 'show-tooltips', page)

  end

  it 'highlight' do

    create(
      :collection,
      id: 1,
      geometry: Helpers::Geo.point(1, 1),
    )

    create(
      :collection,
      id: 2,
      geometry: Helpers::Geo.point(2, 2),
      no_marker: true
    )

    visit('api/collections.json')

    write_collection_fixture('collection-markers', 'highlight', page)

  end

end
