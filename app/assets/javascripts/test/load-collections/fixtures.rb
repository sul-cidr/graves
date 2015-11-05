
require 'rails_helper'

describe API::CollectionsController, type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'display markers' do

    create(:collection, id: 1, geometry: Helpers::Geo.point(1, 2))
    create(:collection, id: 2, geometry: Helpers::Geo.point(3, 4))
    create(:collection, id: 3, geometry: Helpers::Geo.point(5, 6))

    get :index

    write_fixture(
      'load-collections',
      'display-markers',
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
      'load-collections',
      'show-tooltip',
      response.body
    )

  end

end
