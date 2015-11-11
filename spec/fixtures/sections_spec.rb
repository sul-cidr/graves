
require 'rails_helper'

describe 'Sections', type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'sections' do

    markup = ''

    10.times do |i|
      markup += 'word '*1000
      markup += <<-HTML
        <div class="section"></div>
      HTML
    end

    create(
      :narrative,
      slug: 'narrative',
      markup: markup,
    )

    @controller = API::NarrativesController.new
    get :show, id: 'narrative'

    write_fixture(
      'sections',
      'sections.narrative',
      response.body
    )

  end

end
