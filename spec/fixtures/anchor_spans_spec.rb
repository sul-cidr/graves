
require 'rails_helper'

describe 'Anchor Spans', type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'data-focus' do

    markup = <<-HTML
      <span class="anchor" data-focus="1,2">anchor</span>
    HTML

    create(
      :narrative,
      slug: 'narrative',
      markup: markup,
    )

    @controller = API::NarrativesController.new
    get :show, id: 'narrative'

    write_fixture(
      'anchor-spans',
      'data-focus.narrative',
      response.body
    )

  end

  it 'data-zoom' do

    markup = <<-HTML
      <span class="anchor" data-focus="1,2" data-zoom="1">anchor</span>
    HTML

    create(
      :narrative,
      slug: 'narrative',
      markup: markup,
    )

    @controller = API::NarrativesController.new
    get :show, id: 'narrative'

    write_fixture(
      'anchor-spans',
      'data-zoom.narrative',
      response.body
    )

  end

end
