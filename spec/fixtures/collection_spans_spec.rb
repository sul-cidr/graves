
require 'rails_helper'

describe 'Collection Spans', type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'show line' do

    # COLLECTION

    create(
      :collection,
      id: 1,
      geometry: Helpers::Geo.point(0, 0)
    )

    @controller = API::CollectionsController.new
    get :index

    write_fixture(
      'collection-spans',
      'show-line.collections',
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
      'show-line.narrative',
      response.body
    )

  end

end