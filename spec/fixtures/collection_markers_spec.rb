
require 'rails_helper'

describe API::CollectionsController, type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'add markers' do

    create(:collection, id: 1, geometry: Helpers::Geo.point(1, 2))
    create(:collection, id: 2, geometry: Helpers::Geo.point(3, 4))
    create(:collection, id: 3, geometry: Helpers::Geo.point(5, 6))

    get :index

    write_fixture(
      'collection-markers',
      'add-markers',
      response.body
    )

  end

  it 'show tooltip' do

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

    get :index

    write_fixture(
      'collection-markers',
      'show-tooltip',
      response.body
    )

  end

  it 'hide tooltip' do

    create(:collection, id: 1, geometry: Helpers::Geo.point(0, 0))

    get :index

    write_fixture(
      'collection-markers',
      'hide-tooltip',
      response.body
    )

  end

  it 'show modal' do

    create(:collection, id: 1, geometry: Helpers::Geo.point(0, 0))

    get :index

    write_fixture(
      'collection-markers',
      'show-modal',
      response.body
    )

  end

end
