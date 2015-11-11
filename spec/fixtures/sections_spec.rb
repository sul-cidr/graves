
require 'rails_helper'

describe 'Sections', type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'valid' do

    markup = ''

    10.times do |i|

      markup += 'word '*1000

      tl = "0,#{100*(i+1)}"
      br = "100,#{100*i}"

      markup += <<-HTML
        <div
          class="section"
          data-label="Section #{i}"
          data-tl="#{tl}"
          data-br="#{br}">
      HTML

      markup += 'word '*1000
      markup += '</div>'

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
      'valid.narrative',
      response.body
    )

  end

end
