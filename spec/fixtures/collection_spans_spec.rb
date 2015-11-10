
require 'rails_helper'

describe 'Collection Spans', type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'data-id' do

    # COLLECTION

    create(
      :collection,
      id: 1,
      geometry: Helpers::Geo.point(1, 2)
    )

    @controller = API::CollectionsController.new
    get :index

    write_fixture(
      'collection-spans',
      'data-id.collections',
      response.body
    )

    # NARRATIVE

    markup = <<-HTML
      <span class="collection" data-id="1">collection</span>
    HTML

    create(
      :narrative,
      slug: 'narrative',
      markup: markup,
    )

    @controller = API::NarrativesController.new
    get :show, id: 'narrative'

    write_fixture(
      'collection-spans',
      'data-id.narrative',
      response.body
    )

  end

  it 'data-zoom' do

    # COLLECTION

    create(
      :collection,
      id: 1,
      geometry: Helpers::Geo.point(1, 2)
    )

    @controller = API::CollectionsController.new
    get :index

    write_fixture(
      'collection-spans',
      'data-zoom.collections',
      response.body
    )

    # NARRATIVE

    markup = <<-HTML
      <span class="collection" data-id="1" data-zoom="1">collection</span>
    HTML

    create(
      :narrative,
      slug: 'narrative',
      markup: markup,
    )

    @controller = API::NarrativesController.new
    get :show, id: 'narrative'

    write_fixture(
      'collection-spans',
      'data-zoom.narrative',
      response.body
    )

  end

end
