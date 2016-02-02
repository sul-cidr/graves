
require 'rails_helper'

describe 'graves/read', type: :view do

  let!(:narrative) {
    create(:narrative, title: 'Title')
  }

  it 'displays the title' do

    assign(:narrative, create(
      :narrative,
      title: 'Title',
    ))

    render

    expect(rendered).to have_tag('h1.title', 'Title')

  end

end
